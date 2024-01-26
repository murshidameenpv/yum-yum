import express from "express";
const router = express.Router();
import { getAllMenu } from '../controller/menuController.js'
//get all menu
router.get('/',getAllMenu)

export default router;  