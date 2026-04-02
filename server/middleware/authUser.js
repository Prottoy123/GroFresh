import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js"; // 🚨 ইউজার মডেল ইম্পোর্ট করতে হবে

export const authUser = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request: No token provided");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Verify User Existence in Database
    const user = await User.findById(decodedToken?.id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token: User no longer exists");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
