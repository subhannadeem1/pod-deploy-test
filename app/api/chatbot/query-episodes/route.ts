// app/api/chatbot/query-episodes/route.ts
import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { embeddings } from "../../../../lib/openai";
import { supabase } from "../../../../lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json(
        { error: "No query provided." },
        { status: 400 }
      );
    }

    // 1. Parse the query for specific episode or podcast mentions
    const episodeMatch = query.match(/episode (\d+)/i);
    const specificEpisodeNum = episodeMatch
      ? Number.parseInt(episodeMatch[1], 10)
      : null;
    const podcastMatch = query.match(/(?:podcast|show) ([a-zA-Z0-9-]+)/i);
    const specificPodcastId = podcastMatch
      ? podcastMatch[1].toLowerCase()
      : null;

    // 2. Embed the user query
    const queryEmbedding = await embeddings.embedQuery(query);

    // 3. Call Supabase RPC with optional filters
    const matchCount = 20; // Increased for better coverage
    const matchThreshold = 0.5; // Lowered for broader retrieval

    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: queryEmbedding,
      match_threshold: matchThreshold,
      match_count: matchCount,
      target_podcast_id: specificPodcastId || null,
      target_episode_number: specificEpisodeNum || null,
    });

    if (error) {
      console.error("Error in match_documents RPC:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ episodes: [] });
    }

    // 4. Group chunks by (podcast_id, episode_number)
    const grouped: Record<string, any[]> = {};
    for (const row of data) {
      const key = `${row.podcast_id}-${row.episode_number}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(row);
    }

    // 5. Calculate episode scores based on top 3 chunk similarities
    const episodeScores: Record<string, number> = {};
    for (const [key, chunks] of Object.entries(grouped)) {
      const topSimilarities = chunks
        .map((c) => c.similarity)
        .sort((a, b) => b - a)
        .slice(0, 3);
      const score =
        topSimilarities.reduce((sum, s) => sum + s, 0) / topSimilarities.length;
      episodeScores[key] = score;
    }

    // 6. Sort and select top 5 episodes
    const sortedEpisodes = Object.entries(episodeScores)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .slice(0, 5)
      .map(([key]) => grouped[key]);

    // 7. Generate cleaned snippets for each episode
    const finalResults = [];

    try {
      const cleaningLLM = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY!,
        modelName: "gpt-3.5-turbo",
        temperature: 0, // No creativity, just formatting
        streaming: false,
      });

      for (const episodeChunks of sortedEpisodes) {
        const bestChunk = episodeChunks.sort(
          (a, b) => b.similarity - a.similarity
        )[0];
        const lines = bestChunk.transcript
          ? bestChunk.transcript.split("\n")
          : [];
        let snippet = lines.slice(0, 4).join("\n");

        try {
          const response = await cleaningLLM.call([
            {
              role: "system",
              content:
                "You are a text formatting assistant. " +
                "Your job is to fix spacing, punctuation, and line breaks. " +
                "Do not add new content. Just clean it up.",
            },
            {
              role: "user",
              content: snippet,
            },
          ]);

          snippet = response.text.trim();
        } catch (err) {
          console.error("Error cleaning snippet:", err);
          // Use the original snippet if cleaning fails
        }

        finalResults.push({
          podcast_id: bestChunk.podcast_id,
          episode_number: bestChunk.episode_number,
          episode_title: bestChunk.episode_title,
          episode_date: bestChunk.episode_date,
          podcast_image: bestChunk.podcast_image,
          snippet,
          link: `/podcast/${bestChunk.podcast_id}/${bestChunk.episode_number}`,
        });
      }
    } catch (err) {
      console.error("Error processing episodes:", err);
      // Return whatever results we have so far
    }

    // 8. Return the results
    return NextResponse.json({ episodes: finalResults });
  } catch (err: any) {
    console.error("Error in query-episodes route:", err);
    return NextResponse.json(
      { error: err.message || "An error occurred" },
      { status: 500 }
    );
  }
}
