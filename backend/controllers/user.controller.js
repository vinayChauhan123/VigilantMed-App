import User from "../models/user.model.js";
import { generateToken } from "../utils/generate-token.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, dob, gender } = req.body;
    

    console.log(name, email, password, confirmPassword, dob, gender);

    if (!name || !email || !password || !confirmPassword || !dob || !gender) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error hashing password",
        error: error.message,
      });
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      dob,
      gender,
    });

    generateToken(res, user._id, user.dob, user.gender);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    try {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({
          success: false,
          message: "Invalid password",
        });
      }

      generateToken(res, user._id);

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        userId: user._id,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in user",
      error: error.message,
    });
  }
};

export const logOutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error loggin out user",
      error: error.message,
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    // verify token in cookies
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    res.status(200).json({
      success: true,
      userId: user._id,
      dob: user.dob,
      gender: user.gender,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error checking auth",
      error: error.message,
    });
  }
};
