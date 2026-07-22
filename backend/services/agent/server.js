import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDb from "./config/db.js";
import router from "./routes/agent.routes.js";
// import router from "./routes/auth.route.js";
dotenv.config();
const PORT = process.env.PORT || 9003;

const app = express();
app.use(express.json());
app.use("/", router);

// app.get("/", (req, res) => {
//   res.json({ message: "Hello from Anshuman" });
// });
app.get("/", (req, res) => {
  res.json({ message: "Hello from agent" });
});

app.listen(PORT, () => {
  console.log(`agent started at ${PORT}`);
  connectDb();
});
