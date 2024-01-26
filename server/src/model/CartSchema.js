import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
  {
    menuItemId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      trim: true
    },
  },
  { timestamps: true }
);
const cartDb = mongoose.model("Cart", cartSchema);
export default cartDb;
