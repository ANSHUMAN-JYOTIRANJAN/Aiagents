import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connect } from "mongoose";
import connectDb from "./config/db.js";
import router from "./routes/billing.routes.js";
dotenv.config();
const PORT = process.env.PORT || 9004;

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use("/", router);

// app.get("/", (req, res) => {
//   res.json({ message: "Hello from Anshuman" });
// });
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Billing Service Running",
  });
});

app.listen(PORT, () => {
  connectDb();
  console.log(`billing service running on ${PORT}`);
});
