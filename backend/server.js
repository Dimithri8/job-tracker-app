import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import updateUser from "./routes/updateUserRoutes.js";

connectDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/update-user", updateUser);
app.use("/jobs", jobRoutes);
app.use("/interviews", interviewRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/todos", todoRoutes);

app.get("/", (req, res) => res.send("API is running"));

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
