import express from "express";
const router = express.Router();
import { getAllMenu, addMenuItems } from "../controller/menuController.js";
//get all menu
router.get('/',getAllMenu)
router.post("/", addMenuItems);

export default router;  