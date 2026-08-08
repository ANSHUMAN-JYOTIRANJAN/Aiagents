import redis from "../../../shared/redis/redis.js";
import { graph } from "../graph/graph.js";
import { addMessage } from "../utils/memory.js";
import axios from "axios";

export const chat = async (req, res, next) => {
    try {
        const {
            prompt,
            conversationId,
            agent,
        } = req.body;

        const userId = req.headers["x-user-id"];

        console.log("========== CHAT REQUEST ==========");
        console.log("prompt:", prompt);
        console.log("conversationId:", conversationId);
        console.log("agent:", agent);
        console.log("userId:", userId);
        console.log("file:", req.file);

        await addMessage(
            conversationId,
            "user",
            prompt
        );

        await axios.post(
            `${process.env.CHAT_SERVICE}/save-message`,
            {
                conversationId,
                role: "user",
                content: prompt,
            }
        );

        const file = req.file
            ? {
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                path: req.file.path,
            }
            : null;

        const result = await graph.invoke({
            prompt,
            conversationId,
            userId,
            agent,
            file,
        });

        console.log("GRAPH RESULT:", result);

        await addMessage(
            conversationId,
            "assistant",
            result.response
        );

        await axios.post(
            `${process.env.CHAT_SERVICE}/save-message`,
            {
                conversationId,
                role: "assistant",
                content: result.response,
                images: result.images || [],
                artifacts: result.artifacts || [],
            }
        );

        return res.json({
            success: true,
            answer: result.response,
            images: result.images || [],
            artifacts: result.artifacts || [],
        });

    } catch (error) {
        console.error("CHAT CONTROLLER ERROR:", error);
        next(error);
    }
};