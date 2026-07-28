import { TavilySearch } from "@langchain/tavily";

export const searchTool = new TavilyResearch({
  maxResults: 5,
  topic: "general",
  includeImages: true,
});
