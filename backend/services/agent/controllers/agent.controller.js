import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessage } from "../config/memory.js";

const getChatServiceUrl = () =>
  process.env.CHAT_SERVICE || "http://localhost:9002";

export const agent = async (req, res) => {
  try {
    const { prompt, conversationId } = req.body || {};
    const promptText = typeof prompt === "string" ? prompt : "";

    if (!promptText || !conversationId) {
      return res
        .status(400)
        .json({ message: "Prompt and conversationId are required" });
    }

    const chatServiceUrl = getChatServiceUrl();
    await addMessage(conversationId, "user", promptText);
    await axios
      .post(`${chatServiceUrl}/save-converse`, {
        conversationId,
        role: "user",
        content: promptText,
      })
      .catch((error) => {
        console.error(
          "chat save-converse failed",
          chatServiceUrl,
          error?.response?.status,
          error?.response?.data || error.message,
        );
      });

    const result = await graph.invoke({
      prompt: promptText,
      conversationId,
    });
    const response =
      typeof result?.aiResponse === "string"
        ? result.aiResponse
        : result?.aiResponse?.content || "No response generated";

    await addMessage(conversationId, "assistant", response);
    await axios
      .post(`${chatServiceUrl}/save-message`, {
        conversationId,
        role: "assistant",
        content: response,
      })
      .catch((error) => {
        console.error(
          "chat save-message failed",
          chatServiceUrl,
          error?.response?.status,
          error?.response?.data || error.message,
        );
      });

    return res
      .status(200)
      .json({ answer: response, images: [], artifacts: [] });
  } catch (error) {
    console.error("agent controller error", error);
    return res.status(500).json({ message: error.message || "agent error" });
  }
};
