// app/api/chatbot/query-answer/route.ts
import { NextResponse } from "next/server";
import { embeddings } from "../../../../lib/openai";
import { supabaseVector } from "../../../../lib/supabaseClient";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(request: Request) {
  try {
    // 1. Parse the request body to extract the query
    const { query } = await request.json();
    if (!query) {
      return NextResponse.json(
        { error: "No query provided." },
        { status: 400 }
      );
    }

    // 2. Parse the query for specific episode or podcast mentions
    const episodeMatch = query.match(/episode (\d+)/i);
    const specificEpisodeNum = episodeMatch
      ? parseInt(episodeMatch[1], 10)
      : null;
    const podcastMatch = query.match(/(?:podcast|show) ([a-zA-Z0-9-]+)/i);
    const specificPodcastId = podcastMatch
      ? podcastMatch[1].toLowerCase()
      : null;

    // 3. Generate an embedding for the query
    const queryEmbedding = await embeddings.embedQuery(query);

    // 4. Perform a similarity search in Supabase with optional filters
    const { data, error } = await supabaseVector.rpc("match_documents", {
      query_embedding: queryEmbedding,
      match_threshold: 0.5, // Lower threshold for broader retrieval
      match_count: 20,      // Increased count for better coverage
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

    // 5. Group the returned chunks by podcast_id and episode_number
    const groups: Record<string, any[]> = {};
    data.forEach((row: any) => {
      const key = `${row.podcast_id}-${row.episode_number}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    });

    // 6. Calculate episode scores (average of top 3 chunk similarities)
    const episodeScores: Record<string, number> = {};
    for (const [key, chunks] of Object.entries(groups)) {
      const topSimilarities = chunks
        .map((c) => c.similarity)
        .sort((a, b) => b - a)
        .slice(0, 3);
      episodeScores[key] =
        topSimilarities.reduce((sum, s) => sum + s, 0) / topSimilarities.length;
    }

    // 7. Select the best episode based on the highest score
    const bestEpisodeKey = Object.entries(episodeScores).reduce((a, b) =>
      episodeScores[b[0]] > episodeScores[a[0]] ? b : a
    )[0];
    const bestChunks = groups[bestEpisodeKey];

    // 8. Prepare context text for the LLM
    const contextText = bestChunks.map((d) => d.transcript).join("\n");
    console.log("Grouped context text for LLM:\n", contextText);

    // 9. Prepare the LLM prompt
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
Don't say "in this episode" or refer to a single source. Just answer directly using the context below.
Context:
${contextText}
Question: ${query}
`;
    }

    /* 10. Call the model — NOW WITH STREAMING */
    const streamResult = await streamText({
      model: openai.chat("gpt-4-turbo"), // or "gpt-3.5-turbo"
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: query },
      ],
      temperature: 0.9,
    });

    /* 11. Return a streaming Response */
    return streamResult.toTextStreamResponse(); // <-- keeps the connection open
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
