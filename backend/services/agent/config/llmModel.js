import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();
const grok = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "openai/gpt-oss-120b",
});
const gemini = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.5-flash",
});

export const getModel = async (agent) => {
  switch (agent) {
    case "chat":
      return grok;
    case "search":
      return grok;
    case "coding":
      return gemini;
    default:
      return grok;
  }
};
