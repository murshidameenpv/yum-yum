import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyUser = (req, res) => {
  try {
    const user = req.body;
    const token = jwt.sign(user, process.env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 3600000);
    // console.log(token);

    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(201)
      .json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while verifying the user." });
  }
};
