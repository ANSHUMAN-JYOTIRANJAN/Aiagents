import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import protect from "./middleware/auth.middleware.js";
import curruser from "./controllers/user.controller.js";
import { proxyWithHeader } from "./utils/proxyWithHeader.js";
dotenv.config();
const PORT = process.env.PORT || 9000;
const AUTH_SERVICE = process.env.AUTH_SERVICE || "http://localhost:9001";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(
  "/api/auth",
  proxy(AUTH_SERVICE, {
    proxyReqPathResolver: (req) => req.url,
    parseReqBody: false,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // Preserve the original host header for the auth service.
      proxyReqOpts.headers.host = new URL(AUTH_SERVICE).host;
      return proxyReqOpts;
    },
  }),
);
app.use("/api/chat", protect, proxyWithHeader(process.env.CHAT_SERVICE));
app.use("/api/chat", protect, proxy(process.env.AGENT_SERVICE));
app.get("/", (req, res) => {
  res.json({ message: "Hello World from gateway" });
});
app.get("/api/me", protect, curruser);

app.listen(PORT, () => {
  console.log(`gateway started at ${PORT}`);
});
