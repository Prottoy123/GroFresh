import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authSeller = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.sellerToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request: No seller token provided");
  }

  try {
    // 2. Verify Token Authenticity
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Verify Seller Authority
    if (decodedToken?.email !== process.env.SELLER_EMAIL) {
      throw new ApiError(
        403,
        "Access Denied: You are not authorized as a seller",
      );
    }

    req.seller = decodedToken;

    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid seller token");
  }
});
