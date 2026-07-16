import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI || "https://localhost:9000",
  withCredentials: true,
});
export default api;