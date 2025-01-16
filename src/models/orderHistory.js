import mongoose from "mongoose";

const orderHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    totalAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      pinCode: String,
    },
    orderedAt: {
      type: Date,
      default: Date.now,
    },
    deliveredAt: {
      type: Date,
      // default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.OrderHistory ||
  mongoose.model("OrderHistory", orderHistorySchema);
