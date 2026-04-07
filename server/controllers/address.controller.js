import Address from "../models/Address.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add New Address
export const addAddress = asyncHandler(async (req, res) => {
  const addressData = req.body;

  const userId = req.user._id;

  if (!addressData || Object.keys(addressData).length === 0) {
    throw new ApiError(400, "Valid address data is required");
  }

  const createAddress = await Address.create({ ...addressData, userId });

  if (!createAddress) {
    throw new ApiError(500, "Failed to create address due to server error");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createAddress, "Address Added Successfully"));
});

// Get User Addresses
export const getAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const addresses = await Address.find({ userId });

  return res
    .status(200)
    .json(new ApiResponse(200, addresses, "Addresses Fetched Successfully"));
});
