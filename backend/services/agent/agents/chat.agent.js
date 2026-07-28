import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { getModel } from "../config/llmModel.js";
import { getMemory } from "../config/memory.js";

export const chatAgent = async (params) => {
  try {
    const llm = await getModel("chat");
    const state = params;
    const systemPrompt = "you are intelligent ai assistance";
    const history = await getMemory(state.conversationId);
    const messages = [new SystemMessage(systemPrompt)];

    if (Array.isArray(history)) {
      history.forEach((msg) => {
        if (msg.role === "user") {
          messages.push(new HumanMessage(msg.content));
        }

        if (msg.role === "assistant") {
          messages.push(new AIMessage(msg.content));
        }
      });
    }

    messages.push(new HumanMessage(state.prompt));

    const response = await llm.invoke([
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "human",
        content: state.prompt,
      },
    ]);

    return {
      ...state,
      aiResponse: typeof response?.content === "string" ? response.content : String(response ?? ""),
    };
  } catch (error) {
    console.error("chatAgent error", error);
    return {
      ...params,
      aiResponse: error.message || "AI generation failed",
    };
  }
};
