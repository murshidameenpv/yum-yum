import express from "express";
const router = express.Router();
import {
  getCartByEmail,
  addToCart,
  deleteFromCart,
  updateCartQuantity,
  getSingleCart,
} from "../controller/cartController.js";

router.get("/", getCartByEmail); 
router.post("/", addToCart); 
router.delete("/:id", deleteFromCart); 
router.put("/:id", updateCartQuantity);
router.get("/:id", getSingleCart);

export default router;  