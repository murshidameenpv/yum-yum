import express from "express";
const router = express.Router();
import { getCartByEmail, addToCart } from "../controller/cartController.js";

router.get("/", getCartByEmail); 
router.post("/", addToCart); 


export default router;  