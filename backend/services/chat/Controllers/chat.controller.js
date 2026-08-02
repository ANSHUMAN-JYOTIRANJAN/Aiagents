import Conversation from "../models/conversation.model.js";
import message from "../models/message.model.js";

export const createConversation = async (req, res) => {
  try {
    const userId =
      req.user?.userId ||
      req.user?._id ||
      req.user?.id ||
      req.body?.userId ||
      req.headers["x-user-id"] ||
      req.headers["x-userid"];
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const conversation = await Conversation.create({
      userId,
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
    const userId =
      req.user?.userId ||
      req.user?._id ||
      req.user?.id ||
      req.body?.userId ||
      req.headers["x-user-id"] ||
      req.headers["x-userid"];
    const conversation = await Conversation.find({
      userId,
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
    const { conversationId, id, title } = req.body;
    const targetConversationId = conversationId || id;
    const conversation = await Conversation.findByIdAndUpdate(
      targetConversationId,
      {
        title,
      },
    );
    return res.status(200).json(conversation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `update  conversation error ${error}` });
  }
};

export const saveConversation = async (req, res) => {
  try {
    const { conversationId, role, content, images, artifacts } = req.body;
    const Message = await message.create({
      conversationId,
      role,
      content,
      images,
      artifacts: artifacts || [],
    });
    return res.status(200).json(Message);
  } catch (error) {
    return res.status(500).json({ msg: `save error message ${error}` });
  }
};
export const getMessages = async (req, res) => {
  try {
    const messages = await message
      .find({
        conversationId: req.params.conversationId,
      })
      .sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: error.message,
    });
  }
};
