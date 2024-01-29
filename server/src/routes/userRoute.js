import express from "express";
import { createUser, deleteUser, getAdmin, getAllUsers, makeAdmin } from "../controller/userController.js";
import { verifyToken } from "../middleware/verify.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
const router = express.Router();
//get all menu
router.get("/",verifyToken,verifyAdmin,getAllUsers);
router.post("/", createUser)
router.delete("/:id",verifyToken,verifyAdmin, deleteUser)
router.get("/admin/:email", verifyToken,   getAdmin);
router.patch("/admin/:id",verifyToken,verifyAdmin,makeAdmin)

export default router;
