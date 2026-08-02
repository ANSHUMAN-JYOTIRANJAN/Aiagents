import { json } from "express";
import redis from "../../../shared/redis/redis.js";
import { getMessages } from "./getMessages.js";
export const getMemory = async (conversationId) => {
  const key = `conversation:${conversationId}`;
  try {
    const cached = await redis.get(key);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (err) {
    console.warn("Redis getMemory warning:", err.message);
  }

  const messages = await getMessages(conversationId);
  try {
    if (messages) {
      await redis.set(key, JSON.stringify(messages), "EX", 24 * 60 * 60);
    }
  } catch (err) {
    console.warn("Redis setMemory warning:", err.message);
  }
  return messages || [];
};

export const addMessage = async (conversationId, role, content) => {
  const key = `conversation:${conversationId}`;
  try {
    const exist = await redis.get(key);
    const messages = exist ? JSON.parse(exist) : [];
    messages.push({
      role,
      content,
    });
    if (messages.length > 20) {
      messages.shift();
    }
    await redis.set(key, JSON.stringify(messages), "EX", 24 * 60 * 60);
  } catch (err) {
    console.warn("Redis addMessage warning:", err.message);
  }
};
