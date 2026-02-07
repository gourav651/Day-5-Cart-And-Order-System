import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requierd: true,
    },
    items: [
      {
        products: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: {
      type: Number,
      requierd: true,
    },
  },
  { timestamps: true },
);
export default mongoose.model("Order",orderSchema);