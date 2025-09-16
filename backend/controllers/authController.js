import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/jwt.js";
import cloudinary from "../config/cloudinary.js";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exist with email" });

    const user = await User.create({ firstName, lastName, email, password });
    const token = createToken(user);

    res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        firstName,
        lastName,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create account right now, please try again shortly",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid email or password" });
    const token = createToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email,
        profileImg: user.profileImg,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to process your request, please try again shortly",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, email, password } = req.body;

    const updatedFields = {};
    if (firstName) updatedFields.firstName = firstName;
    if (lastName) updatedFields.lastName = lastName;
    if (email) updatedFields.email = email;
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 12);
      updatedFields.password = hashedPassword;
    }
    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        folder: "job-tracker/users",
      });
      updatedFields.profileImg = uploadRes.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true }
    ).select("-password");

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({
      message: "Server error, unable to update user",
      error: error.message,
    });
  }
};
