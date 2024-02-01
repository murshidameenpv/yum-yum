import express from "express";
const router = express.Router();
import {
  getAllMenu,
  addMenuItems,
    deleteMenuItem,
  updateSingleMenu,
  getSingleMenuItem,
} from "../controller/menuController.js";
//get all menu
router.get("/",getAllMenu)
router.post("/", addMenuItems);
router.delete("/:id", deleteMenuItem);
router.get("/:id", getSingleMenuItem);
router.patch("/:id", updateSingleMenu);

export default router;  