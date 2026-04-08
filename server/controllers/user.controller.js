import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/User.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  // 1. Validation
  if (!name || !email || !password) {
    throw new ApiError(400, "Name, Email, and Password are required");
  }

  // 2. Check existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  // 3. Hash Password & Create User
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  // 4. Retrieve created user explicitly without the password (Security Measure)
  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // 5. Generate Token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // 6. Set Cookie Options
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  return res
    .status(201)
    .cookie("token", token, options)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

//login

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Validation
  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // 4. Compare Password
  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new ApiError(401, "Invalid email or password");
  }

  // 5. Generate Token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // 6. Set Cookie Options
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  // 7. Strip Password from Response Data
  const loggedInUser = await User.findById(user._id).select("-password");

  // 8. Send Proper Response
  return res
    .status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});

// Get Current Authenticated User (isAuth)
export const isAuth = asyncHandler(async (req, res) => {

  return res.status(200).json(
    new ApiResponse(
      200,
      req.user, 
      "User fetched successfully",
    ),
  );
});

// 2. Logout User
export const logout = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  };

  return res
    .status(200)
    .clearCookie("token", options)
    .json(
      new ApiResponse( 
        200,
        {}, 
        "User logged out successfully",
      ),
    );
});