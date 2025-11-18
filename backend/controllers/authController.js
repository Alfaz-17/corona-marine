import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { generateToken } from '../config/generateToken.js';
dotenv.config();


export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ message: "Fill all required details" });
    }

    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    const user = new User({  email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ error: "Error in signup controller", details: error.message });
  }
};




export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }



const token = generateToken(user._id);

res.status(200).json({
  message: "Successfully logged in",
  token,
  user: {
    id: user._id,
    email: user.email,
  },
});

  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    res.json({ id: req.user.id, email: req.user.email });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log("error in get me controller", error);
  }
};
