import Conversation from "../models/conversation.model.js";
import message from "../models/message.model.js";

export const createConversation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    console.log("userId", userId);
    const conversation = await Conversation.create({
      userId: userId,
    });
    return res.status(200).json(conversation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `create conversation error ${error}` });
  }
};

export const getConversation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    console.log("userId", userId);
    const conversation = await Conversation.find({
      userId: userId,
    }).sort({ updatedAt: -1 });
    return res.status(200).json(conversation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `create conversation error ${error}` });
  }
};

export const updateConversation = async (req, res) => {
  try {
    const { id, title } = req.body;
    const conversation = await Conversation.findByIdAndUpdate(id, {
      title,
    });
    return res.status(200).json(conversation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `update  conversation error ${error}` });
  }
};

export const saveConversation = async (req, res) => {
  try {
    const { conversationId, role, content } = req.body;
    const Message = await message.create({
      conversationId,
      role,
      content,
    });
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ msg: `save error message ${error}` });
  }
};

export const getMessages = async (req, res) => {
  try {
    // const { conversationId } = req.body;
    const Message = await message
      .find({
        conversationId: req.params.conversationId,
      })
      .sort({ createdAt: -1 });
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ msg: `get error message ${error}` });
  }
};
