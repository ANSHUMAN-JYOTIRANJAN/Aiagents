import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDb from "./config/db.js";
// import router from "./routes/auth.route.js";
dotenv.config();
const PORT = process.env.PORT || 9002;

const app = express();
app.use(express.json());
// app.use("/",router);

// app.get("/", (req, res) => {
//   res.json({ message: "Hello from Anshuman" });
// });
app.get("/", (req, res) => {
  res.json({ message: "Hello from chat" });
});

app.listen(PORT, () => {
  console.log(`chat started at ${PORT}`);
  connectDb();
});
