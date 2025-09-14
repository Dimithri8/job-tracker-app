import dotenv from "dotenv";
dotenv.config();
// console.log("JWT_SECRET:", process.env.JWT_SECRET);
import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

connectDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("API is running"));

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
