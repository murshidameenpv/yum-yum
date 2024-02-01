import express from "express";
import { stripeIntent } from "../controller/stripeController.js";
const router = express.Router();
router.post("/create-payment-intent", stripeIntent);

export default router;
