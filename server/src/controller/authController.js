import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyUser = (req, res) => {
  try {
     const user = req.body;
     const token = jwt.sign(user, process.env.JWT_SECRET, {
       expiresIn: "1hr",
     });
     res.json({ token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while verifying the user." });
  }
};
