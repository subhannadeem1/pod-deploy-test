// app/api/chatbot/query-episodes/route.ts
import { NextResponse } from "next/server";
import { embeddings } from "../../../../lib/openai";
import { supabase } from "../../../../lib/supabaseClient";

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

    const matchCount = 10; // Reduced from 20
    const matchThreshold = 0.5;

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

    const grouped: Record<string, any[]> = {};
    for (const row of data) {
      const key = `${row.podcast_id}-${row.episode_number}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(row);
    }

    const episodeScores: Record<string, number> = {};
    for (const [key, chunks] of Object.entries(grouped)) {
      const topSimilarities = chunks
        .map((c) => c.similarity)
        .sort((a, b) => b - a)
        .slice(0, 3);
      const score = topSimilarities.reduce((sum, s) => sum + s, 0) / topSimilarities.length;
      episodeScores[key] = score;
    }

    const sortedEpisodes = Object.entries(episodeScores)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .slice(0, 5)
      .map(([key]) => grouped[key]);

    const finalResults = [];
    for (const episodeChunks of sortedEpisodes) {
      const bestChunk = episodeChunks.sort((a, b) => b.similarity - a.similarity)[0];
      const lines = bestChunk.transcript ? bestChunk.transcript.split("\n") : [];
      const snippet = lines.slice(0, 4).join("\n"); // Simplified, no LLM cleanup

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

    return NextResponse.json({ episodes: finalResults });
  } catch (err: any) {
    console.error("Error in query-episodes route:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}