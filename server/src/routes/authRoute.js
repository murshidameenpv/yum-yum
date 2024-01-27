import express from "express";
const router = express.Router();
import { verifyUser } from "../controller/authController.js";
router.post('/', verifyUser)
export default router;  