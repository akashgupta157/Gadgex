import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);
