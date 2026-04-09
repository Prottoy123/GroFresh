import { asyncHandler } from "../utils/asyncHandler.js"; // ইম্পোর্ট নিশ্চিত করো
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Product from "../models/Product.models.js";
import { uploadOnCloudinary } from "../configs/cloudinary.js";

// 1. Add Product
export const createProduct = asyncHandler(async (req, res) => {
  let productData;
  try {
    productData = JSON.parse(req.body.productData);
  } catch (error) {
    throw new ApiError(400, "Invalid productData format. Must be valid JSON.");
  }

  const imageBuffer = req.files?.image?.[0]?.buffer;
  if (!imageBuffer) {
    throw new ApiError(400, "Product image file is required");
  }

  const image = await uploadOnCloudinary(imageBuffer);

  if (!image) {
    throw new ApiError(500, "Error uploading image to Cloudinary");
  }

  const newProduct = await Product.create({
    ...productData,
    image: image.secure_url,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newProduct, "Product Added Successfully"));
});

// 2. Product List
export const productList = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Product List Fetched Successfully"));
});

// 3. Product By ID (Fixed REST principles)
export const productById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Product ID is required in params");
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product Not Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product Found Successfully"));
});

// 4. Change Stock
export const changeStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { inStock } = req.body;

  if (inStock === undefined) {
    throw new ApiError(400, "inStock value is required");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { inStock },
    { new: true, runValidators: true },
  );

  if (!updatedProduct) {
    throw new ApiError(404, "Product not found or update failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Stock Updated Successfully"));
});
