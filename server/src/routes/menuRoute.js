import express from "express";
const router = express.Router();
import { getAllMenu } from '../controller/userController.js'
//get all menu
router.get('/menu',getAllMenu)

export default router;  