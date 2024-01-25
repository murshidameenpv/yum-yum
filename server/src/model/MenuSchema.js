import mongoose from "mongoose";
const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim:true
    },
    recipe: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      require:true
    },
    price: {
      type: Number,
      require:true
    },
  },
  { timestamps: true }
);
const menuDb = mongoose.model("Menu", menuSchema);
export default menuDb;
