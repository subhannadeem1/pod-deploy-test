// app/api/chatbot/query-answer/route.ts
import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { embeddings } from "../../../../lib/openai";
import { supabase } from "../../../../lib/supabaseClient";
import { TextEncoder } from "util";

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required and must be a string" }, { status: 400 });
    }

    let specificEpisodeNum: number | null = null;
    let specificPodcastId: string | null = null;
    try {
      const episodeMatch = query.match(/episode (\d+)/i);
      specificEpisodeNum = episodeMatch ? parseInt(episodeMatch[1], 10) : null;
      const podcastMatch = query.match(/(?:podcast|show) ([a-zA-Z0-9-]+)/i);
      specificPodcastId = podcastMatch ? podcastMatch[1].toLowerCase() : null;
    } catch (err) {
      console.error("Error parsing query:", err);
      return NextResponse.json({ error: "Invalid query format" }, { status: 400 });
    }

    const queryEmbedding = await embeddings.embedQuery(query);

    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: queryEmbedding,
      match_threshold: 0.5,
      match_count: 10, // Reduced from 20
      target_podcast_id: specificPodcastId || null,
      target_episode_number: specificEpisodeNum || null,
    });
    console.log("Supabase results:", data);

    if (error) {
      console.error("Error performing similarity search:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ answer: "No relevant content found." });
    }

    const groups: Record<string, any[]> = {};
    data.forEach((row: any) => {
      const key = `${row.podcast_id}-${row.episode_number}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    });

    const episodeScores: Record<string, number> = {};
    for (const [key, chunks] of Object.entries(groups)) {
      const topSimilarities = chunks
        .map((c) => c.similarity)
        .sort((a, b) => b - a)
        .slice(0, 3);
      const score = topSimilarities.reduce((sum, s) => sum + s, 0) / topSimilarities.length;
      episodeScores[key] = score;
    }

    const bestEpisodeKey = Object.entries(episodeScores).reduce((a, b) =>
      episodeScores[b[0]] > episodeScores[a[0]] ? b : a
    )[0];
    const bestChunks = groups[bestEpisodeKey];

    const contextText = bestChunks.slice(0, 3).map((d) => d.transcript).join("\n"); // Limit to 3 chunks
    console.log("Grouped context text for LLM:\n", contextText);

    let prompt;
    if (specificEpisodeNum && specificPodcastId) {
      prompt = `
You are an assistant summarizing or answering based on Episode ${specificEpisodeNum} of the ${specificPodcastId} podcast.
Context:
${contextText}
Question: ${query}
`;
    } else {
      prompt = `
You are an assistant answering based on the most relevant podcast episode.
Context:
${contextText}
Question: ${query}
`;
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const streamingLLM = new ChatOpenAI({
          openAIApiKey: process.env.OPENAI_API_KEY!,
          modelName: "gpt-4",
          temperature: 0.9,
          streaming: true,
          callbacks: [
            {
              handleLLMNewToken(token: string) {
                const queue = encoder.encode(token);
                controller.enqueue(queue);
              },
              handleLLMEnd() {
                controller.close();
              },
              handleLLMError(err: Error) {
                controller.error(err);
              },
            },
          ],
        });

        await streamingLLM.call([
          { role: "system", content: prompt },
          { role: "user", content: query },
        ]);
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}