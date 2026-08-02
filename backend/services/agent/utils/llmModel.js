import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenRouter } from "@langchain/openrouter";
import dotenv from "dotenv";
dotenv.config();

const createGroqModel = () => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured");
  }
  return new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
  });
};

const createGeminiModel = () => {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("GOOGLE_API_KEY is not configured");
  }
  return new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-1.5-flash",
  });
};

const createopenRouter = () => {
  if (process.env.OPENROUTER_API_KEY) {
    return new ChatOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
      model: "deepseek/deepseek-chat",
      temperature: 0,
      maxTokens: 2500,
    });
  }
  return createGroqModel();
};

export const getModel = async (agent) => {
  switch (agent) {
    case "chat":
      return createGroqModel();
    case "search":
      return createGroqModel();
    case "coding":
      return createopenRouter();
    case "image":
      return createGroqModel();
    default:
      return createGroqModel();
  }
};
