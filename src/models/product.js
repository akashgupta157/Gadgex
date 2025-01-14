import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: () => {
        const values = [2.5, 3, 3.5, 4, 4.5, 5];
        return values[Math.floor(Math.random() * values.length)];
      },
    },
    discount: {
      type: Number,
      default: () => {
        const min = 10;
        const max = 30;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
