import mongoose from "mongoose";
const fileSchema = new mongoose.Schema(
  {
    name: String,

    content: String,
  },
  {
    _id: false,
  },
);
const artifactSchema = new mongoose.Schema(
  {
    id: Number,
    type: String,
    title: String,
    files: [fileSchema],
    createdAt: { type: Date, default: Date.now },
  },
  {
    _id: false,
  },
);
const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
    },
    content: String,
    images: [String],
    artifacts: [artifactSchema],
  },
  {
    timestamps: true,
  },
);

const message = mongoose.model("message", messageSchema);
export default message;
