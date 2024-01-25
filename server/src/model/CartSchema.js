import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "https://img.lovepik.com/element/45001/3052.png_300.png",
    },
  },
  { timestamps: true }
);
const userDb = mongoose.model("User", userSchema);
export default userDb;
