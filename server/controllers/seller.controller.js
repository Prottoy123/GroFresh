import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// Seller Login
export const sellerLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required");
  }

  if (
    email !== process.env.SELLER_EMAIL ||
    password !== process.env.SELLER_PASSWORD
  ) {
    throw new ApiError(401, "Invalid seller credentials");
  }

  const token = jwt.sign({ email, role: "seller" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
  };

  return res
    .status(200)
    .cookie("sellerToken", token, options)
    .json(
      new ApiResponse(
        200,
        { email, role: "seller" },
        "Seller logged in successfully",
      ),
    );
});

//seller-auth
export const isSellerAuth = asyncHandler(async (req, res) => {
  const seller = req.seller;

  if (!seller) {
    throw new ApiError(401, "Seller context is missing");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { email: seller.email, role: seller.role },
        "Seller is authenticated and session is valid",
      ),
    );
});

// Seller Logout
export const sellerLogout = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  };

  return res
    .status(200)
    .clearCookie("sellerToken", options)
    .json(new ApiResponse(200, {}, "Seller logged out successfully"));
});
