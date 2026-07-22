import { getModel } from "../config/llmModel.js";

export const chatAgent = async (params) => {
  const llm = getModel("chat");
  const systemPrompt = "you are intelligent ai assistance";
  const response = await llm.invoke([
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "human",
      content: state.Prompt,
    },
  ]);
  return {
    ...state,
    aiResponse: response.content,
  };
};
