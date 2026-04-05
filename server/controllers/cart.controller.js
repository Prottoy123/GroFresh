import User from "../models/user.models.js"; 
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 
import { asyncHandler } from "../utils/asyncHandler.js"; 


// Update Cart
export const updateCart = asyncHandler(async (req, res) => {
  const { userId, cartItems } = req.body; 

  if (!cartItems || !Array.isArray(cartItems)) {
    throw new ApiError(400, "Valid cart items array is required");
  }

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const cartUpdated = await User.findByIdAndUpdate(
    userId,
    {
      $set: { cartItems },
    },
    {
      new: true, // 
      runValidators: true, 
    },
  );

  if (!cartUpdated) {
    throw new ApiError(404, "User not found"); 
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cartUpdated, "Cart Items Updated Successfully"));
});
