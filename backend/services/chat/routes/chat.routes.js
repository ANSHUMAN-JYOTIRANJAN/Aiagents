import express from "express";
import {
  createConversation,
  getConversation,
  getMessages,
  saveConversation,
  updateConversation,
} from "../Controllers/chat.controller.js";
const router = express.Router();
router.post("/create-conversation", createConversation);
router.get("/create-conversation", createConversation);
router.get("/get-conversations", getConversation);
router.post("/update-conversation", updateConversation);
router.post("/save-converse", saveConversation);
router.post("/save-message", saveConversation);
router.get("/get-messages/:conversationId", getMessages);
export default router;
