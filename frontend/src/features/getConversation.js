import api from "../utils/axios";

export const getCononversation = async () => {
  try {
    const { data } = await api("/api/chat/get-conversation");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
