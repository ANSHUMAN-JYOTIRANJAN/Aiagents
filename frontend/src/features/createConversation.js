import api from "../utils/axios";

export const createConversation = async () => {
  try {
    const { data } = await api("/api/chat/create-conversation");
    return data;
  } catch (error) {
    return [];
  }
};
