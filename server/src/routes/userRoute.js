import express from "express";
import { createUser, deleteUser, getAdmin, getAllUsers, makeAdmin } from "../controller/userController.js";
import { verifyToken } from "../middleware/verify.js";
const router = express.Router();
//get all menu
router.get("/",getAllUsers);
router.post("/", createUser)
router.delete("/:id", deleteUser)
router.get("/:email", getAdmin)
router.patch("/admin/:id",makeAdmin)

export default router;
