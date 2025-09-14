import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { createJob, getJobs } from "../controllers/jobController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/", protect, createJob);
router.get("/", protect, getJobs);

export default router;
