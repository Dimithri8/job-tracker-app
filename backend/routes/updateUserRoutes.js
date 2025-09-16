import express from "express";
import { updateUser } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.put("/", protect, upload.single("profileImg"), updateUser);

export default router;
