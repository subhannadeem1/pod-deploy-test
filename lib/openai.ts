//lib/openai.ts
import 'dotenv/config';

import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";

const openAIApiKey = process.env.OPENAI_API_KEY;

if (!openAIApiKey) {
  throw new Error("OpenAI API Key not found in OPENAI_API_KEY");
}

/**
 * Chat-based model
 */
export const llm = new ChatOpenAI({
  openAIApiKey,
  modelName: "gpt-3.5-turbo", // or "gpt-3.5-turbo"
  temperature: 0.9,
});

/**
 * Embeddings model
 */
export const embeddings = new OpenAIEmbeddings({
  openAIApiKey,
  modelName: "text-embedding-ada-002",
    maxRetries: 0,
});
