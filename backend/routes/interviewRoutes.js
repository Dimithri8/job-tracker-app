import express from "express";
import {
  createInterview,
  updateInterview,
  deleteInterview,
  getInterviews,
} from "../controllers/interviewController";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, createInterview);
router.put("/:id", protect, updateInterview);
router.get("/", protect, getInterviews);
router.delete(":id", protect, deleteInterview);
