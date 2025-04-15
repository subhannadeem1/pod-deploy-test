import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { embeddings } from "../../../../lib/openai";
import { supabase } from "../../../../lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    if (!query) {
      return NextResponse.json({ error: "No query provided." }, { status: 400 });
    }

    // 1. Extract any episode or podcast ID from user input
    const episodeMatch = query.match(/episode (\d+)/i);
    const specificEpisodeNum = episodeMatch ? parseInt(episodeMatch[1], 10) : null;
    const podcastMatch = query.match(/(?:podcast|show) ([a-zA-Z0-9-]+)/i);
    const specificPodcastId = podcastMatch ? podcastMatch[1].toLowerCase() : null;

    // 2. Generate embeddings
    const queryEmbedding = await embeddings.embedQuery(query);

    // 3. Call your Supabase RPC
    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: queryEmbedding,
      match_threshold: 0.5,
      match_count: 20,
      target_podcast_id: specificPodcastId || null,
      target_episode_number: specificEpisodeNum || null,
    });

    if (error) {
      console.error("Error performing similarity search:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ answer: "No relevant content found." });
    }

    // 4. Group chunks by episode & calculate which one is best
    const groups: Record<string, any[]> = {};
    data.forEach((row: any) => {
      const key = `${row.podcast_id}-${row.episode_number}`;
      groups[key] = groups[key] ?? [];
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

    // 5. Identify best episode
    const bestEpisodeKey = Object.entries(episodeScores).reduce((best, current) =>
      episodeScores[current[0]] > episodeScores[best[0]] ? current : best
    )[0];
    const bestChunks = groups[bestEpisodeKey];

    // 6. Create the prompt from those best chunks
    const contextText = bestChunks.map((d) => d.transcript).join("\n");

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

    // 7. Synchronous call to GPT (NO STREAMING)
    const llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY!,
      modelName: "gpt-3.5-turbo",    // Or "gpt-4"
      temperature: 0.9,
      // streaming: false (this is the default)
    });

    const llmResponse = await llm.call([
      { role: "system", content: prompt },
      { role: "user", content: query },
    ]);

    // Depending on your LangChain version, the text might be at llmResponse.text or llmResponse.content
    // Commonly, you'd do:
    const finalAnswer = llmResponse.text?.trim() || llmResponse.content?.trim() || "";

    // 8. Return the answer as JSON instead of streaming
    return NextResponse.json({ answer: finalAnswer });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
