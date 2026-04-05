import Address from "../models/Address.models.js"; 
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addAddress = asyncHandler(async (req, res) => {
  const { address, userId } = req.body;

  if (!address || typeof address !== "object" || Array.isArray(address)) {
    throw new ApiError(400, "Valid address object is required");
  }

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const createAddress = await Address.create({ ...address, userId });

  if (!createAddress) {
    throw new ApiError(500, "Failed to create address due to server error");
  }

  return res
    .status(201) 
    .json(new ApiResponse(201, createAddress, "Address Added Successfully"));
});

export const getAddress = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "User ID is required in URL parameters");
  }

  const addresses = await Address.find({ userId });

  return res
    .status(200)
    .json(new ApiResponse(200, addresses, "Addresses Fetched Successfully")); // মেসেজ ফিক্সড
});
