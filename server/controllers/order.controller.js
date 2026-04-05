import Order from "../models/Order.models.js";
import Product from "../models/Product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// 1. Place COD Order
export const placeOrderCOD = asyncHandler(async (req, res) => {
  const { items, address } = req.body;
  const userId = req.user._id; 

  if (!address || !items || items.length === 0) {
    throw new ApiError(400, "Address and Items are required");
  }

  let totalAmount = 0;

  for (const item of items) {
    const product = await Product.findById(item.product);

    if (!product) {
      throw new ApiError(404, `Product with ID ${item.product} not found`);
    }

    totalAmount += (product.offerPrice || product.price) * item.quantity;
  }

  const finalAmount = totalAmount + Math.floor(totalAmount * 0.02);

  const createOrder = await Order.create({
    userId,
    items,
    amount: finalAmount, 
    address,
    paymentType: "COD",
  });

  if (!createOrder) {
    throw new ApiError(500, "Failed to place order due to server error");
  }

  return res.status(201).json(
    new ApiResponse(201, createOrder, "Order Placed Successfully"),
  );
});

// 2. Get Single User's Orders
export const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id; 

  const orders = await Order.find({
    userId,
    $or: [{ paymentType: "COD" }, { isPaid: true }],
  })
    .populate("items.product", "name image price offerPrice") 
    .populate("address")
    .sort({ createdAt: -1 });

  if (orders.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No orders found for this user"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

// 3. Get All Orders (Admin/Seller Route)
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    $or: [{ paymentType: "COD" }, { isPaid: true }],
  })
    .populate("items.product", "name image price")
    .populate("address")
    .sort({ createdAt: -1 });

  if (orders.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No orders available"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "All orders fetched successfully"));
});
