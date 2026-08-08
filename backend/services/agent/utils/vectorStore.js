import { embeddings } from "./embedding.js";
import { QdrantVectorStore } from "@langchain/qdrant";
export const createVectorStore = async (
  collectionName,
  docs,
) => {
  return await QdrantVectorStore.fromDocuments(
    docs,
    embeddings,
    {
      url: process.env.QDRANT_URL,

      apiKey: process.env.QDRANT_API_KEY,

      collectionName,
    },
  );
};

