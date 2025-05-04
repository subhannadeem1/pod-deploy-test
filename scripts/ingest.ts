// scripts/ingest.ts
import 'dotenv/config';
import fs from "fs";
import path from "path";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { embeddings } from "../lib/openai"; // Your OpenAI embeddings
import { supabase, supabaseVector } from "../lib/supabaseClient"; // Your Supabase clients
import * as crypto from "crypto";

const filesDir = path.join(process.cwd(), "public", "files");

async function main() {
  // 1. Read all PDFs from /public/files
  const allFiles = fs.readdirSync(filesDir).filter((file) => file.endsWith(".pdf"));

  for (const fileName of allFiles) {
    try {
      const filePath = path.join(filesDir, fileName);

      // 2. Load PDF content using PDFLoader
      const loader = new PDFLoader(filePath);
      const docs = await loader.load(); // Array of Document objects
      if (!docs.length) {
        console.warn(`No content found in ${fileName}`);
        continue;
      }

      // Combine all pages into a single text block
      const fullText = docs.map((doc) => doc.pageContent).join("\n");

      // 3. Generate a unique hash of the PDF to detect changes
      const pdfBuffer = fs.readFileSync(filePath);
      const pdfHash = crypto.createHash("sha256").update(pdfBuffer).digest("hex");

      // 4. Parse podcast_id and episode_number from filename (e.g., "lex-fridman-458")
      const baseName = fileName.replace(".pdf", "");
      const [podcastId, episodeNum] = parsePodcastAndEpisode(baseName);

      // 4a. Fetch metadata from the "podcast_episode" table in old database
      const { data: metadata, error: metadataError } = await supabase
        .from("podcast_episode")
        .select("title, created_at")
        .eq("podcast_id", podcastId)
        .eq("number", episodeNum)
        .maybeSingle();

      if (metadataError) {
        console.error("Error fetching metadata for", podcastId, episodeNum, metadataError);
      }

      const episodeTitle = metadata?.title || null;
      const episodeDate = metadata?.created_at || null;
      const podcastImage = `/${podcastId}.jpg`; // Derive image path

      // 4b. Check for existing entry in new database with matching podcast_id, episode_number, and pdf_hash
      const { data: existingRows, error: existingError } = await supabaseVector
        .from("episodes_vector_store")
        .select("*")
        .eq("podcast_id", podcastId)
        .eq("episode_number", episodeNum);

      if (existingError) {
        console.error("Error fetching existing row:", existingError);
        continue;
      }

      const existingRow = existingRows && existingRows[0];
      if (existingRow && existingRow.pdf_hash === pdfHash) {
        console.log(`No changes in ${fileName}. Skipping re-embedding.`);
        continue;
      }

      // 5. Split the transcript into smaller chunks with overlap
      const splitter = new RecursiveCharacterTextSplitter({
        //chunkSize: 500,   // Smaller chunks for better granularity
        //chunkOverlap: 200 // Larger overlap to preserve context
        chunkSize: 1000,
        chunkOverlap: 100,
      });
      const chunks = await splitter.createDocuments([fullText]);

      // 6. Process each chunk: generate embeddings and upsert into new database
      const upsertPromises = chunks.map(async (chunk, index) => {
        const sanitizedText = chunk.pageContent.replace(/\u0000/g, ""); // Remove null characters

        // 6.1 Generate an embedding for the chunk text
        const embeddingResponse = await embeddings.embedQuery(sanitizedText);

        // b option Prepend metadata to text for embedding (not stored)
        //const chunkTextWithMetadata = `Episode ${episodeNum}: ${episodeTitle}\n${sanitizedText}`;
        //const embeddingResponse = await embeddings.embedQuery(chunkTextWithMetadata);

        // Upsert into episodes_vector_store in new database
        const { error: upsertError } = await supabaseVector
          .from("episodes_vector_store")
          .upsert({
            podcast_id: podcastId,
            episode_number: Number(episodeNum),
            episode_title: episodeTitle,
            episode_date: episodeDate,
            podcast_image: podcastImage,
            transcript: sanitizedText,
            embedding: embeddingResponse,
            pdf_hash: pdfHash,
          });

        if (upsertError) {
          console.error(`Error upserting chunk ${index} of ${fileName}:`, upsertError);
        }
      });

      await Promise.all(upsertPromises);
      console.log(`✅ Successfully embedded and stored chunks for ${fileName}`);
    } catch (err) {
      console.error(`Error processing ${fileName}:`, err);
    }
  }
}

// Helper function to parse filename (e.g., "lex-fridman-458" -> ["lex-fridman", 458])
function parsePodcastAndEpisode(baseName: string): [string, number] {
  const parts = baseName.split("-");
  if (parts.length < 2) {
    throw new Error(`Invalid PDF filename format: ${baseName}`);
  }
  const episodeNumStr = parts.pop()!; // Last part is episode number
  const podcastId = parts.join("-"); // Remaining parts form podcast ID
  const episodeNum = Number(episodeNumStr);

  if (isNaN(episodeNum)) {
    throw new Error(`Episode number is not a valid integer in filename: ${baseName}`);
  }

  return [podcastId, episodeNum];
}

main().then(() => {
  console.log("Ingestion complete.");
  process.exit(0);
});