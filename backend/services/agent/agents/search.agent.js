import { Query } from "mongoose";
import { searchTool } from "../utils/tavily.js";
export const searchAgent = async (state) => {
  try {
    const results = await searchTool.invoke({
      Query: state.prompt,
    });
    console.log(results);
    return {
      ...state,
      searchResults: results,
      images: results.images || [],
    };
  } catch (error) {
    return {
      ...state,
      searchAgent: [],
      images: [],
    };
  }
};
