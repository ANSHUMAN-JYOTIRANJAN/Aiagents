import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessage } from "../utils/memory.js";
import redis from "../../../shared/redis/redis.js";
const getChatServiceUrl = () =>
  process.env.CHAT_SERVICE || "http://localhost:9002";

export const agent = async (req, res) => {
  try {
    const { prompt, conversationId, agent } = req.body || {};
    const promptText = typeof prompt === "string" ? prompt : "";

    if (!promptText || !conversationId) {
      return res
        .status(400)
        .json({ message: "Prompt and conversationId are required" });
    }

    const chatServiceUrl = getChatServiceUrl();
    try {
      await addMessage(conversationId, "user", promptText);
    } catch (memErr) {
      console.warn("addMessage user memory warning:", memErr.message);
    }

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
      userId: req.headers["x-user-id"],
      agent,
      file: req.file,
    });

    console.log("========== GRAPH RESULT ==========");
    console.dir(result, { depth: null });
    console.log("Artifacts:", result.artifacts);
    console.log("Images:", result.images);
    console.log("==================================");

    const response =
      typeof result?.aiResponse === "string"
        ? result.aiResponse
        : typeof result?.response === "string"
          ? result.response
          : result?.aiResponse?.content ||
            result?.response?.content ||
            "No response generated";

    const artifacts = Array.isArray(result?.artifacts) ? result.artifacts : [];
    const images = Array.isArray(result?.images) ? result.images : [];

    try {
      await addMessage(conversationId, "assistant", response);
    } catch (memErr) {
      console.warn("addMessage assistant memory warning:", memErr.message);
    }
    await axios
      .post(`${chatServiceUrl}/save-message`, {
        conversationId,
        role: "assistant",
        content: response,
        images,
        artifacts,
      })
      .catch((error) => {
        console.error(
          "chat save-message failed",
          chatServiceUrl,
          error?.response?.status,
          error?.response?.data || error.message,
        );
      });

    return res.status(200).json({
      answer: response,
      images,
      artifacts,
    });
  } catch (error) {
    console.error("agent controller error", error);
    return res.status(500).json({ message: error.message || "agent error" });
  }
};
