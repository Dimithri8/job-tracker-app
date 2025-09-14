import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/jwt.js";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exist with email" });

    const user = User.create({ firstName, lastName, email, password });
    const token = createToken(user);

    res
      .status(201)
      .json({ token, user: { id: user._id, firstName, lastName, email } });
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
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to process your request, please try again shortly",
      error: error.message,
    });
  }
};
