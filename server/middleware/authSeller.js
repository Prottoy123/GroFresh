import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authSeller = asyncHandler(async (req, res, next) => {
  try {
    // ১. টোকেন এক্সট্রাকশন (কুকি অথবা হেডার থেকে)
    const token =
      req.cookies?.sellerToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request: No token found");
    }

    // ২. টোকেন ভেরিফিকেশন
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // ৩. সেলার অথরিটি চেক (Strict Check)
    if (decodedToken?.email !== process.env.SELLER_EMAIL) {
      throw new ApiError(403, "Access Denied: Invalid Seller Credentials");
    }

    // ৪. রিকোয়েস্ট অবজেক্টে ডাটা পাস করা
    req.seller = decodedToken;

    next();
  } catch (error) {
    // এখানে error.message পাস করলে JWT এর ইন্টারনাল এরর (যেমন: 'jwt expired') ইউজার দেখতে পাবে
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
