import api from "../utils/axios";

export const sendPrompt = async (payload) => {
  const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;
  const { data } = await api.post("/api/agent/chat", payload, {
    headers: isFormData ? {} : { "Content-Type": "application/json" },
  });
  return data;
};
