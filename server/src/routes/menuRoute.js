import express from "express";
const router = express.Router();
import { getAllMenu, addMenuItems, deleteMenuItem } from "../controller/menuController.js";
//get all menu
router.get("/",getAllMenu)
router.post("/", addMenuItems);
router.delete("/:id", deleteMenuItem);

export default router;  