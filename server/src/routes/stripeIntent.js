import express from "express";
import { stripeFailure, stripeIntent, stripeSuccess } from "../controller/stripeController.js";
const router = express.Router();
router.post("/create-payment-intent", stripeIntent);
router.get('/success',stripeSuccess)
router.get('/fail',stripeFailure)
export default router;
