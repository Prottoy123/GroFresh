import Order from "../models/Order.models.js";
import Product from "../models/Product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import stripe from "stripe"

// Place order with Stripe paymeSnt
export const placeOrderStripe = asyncHandler(async (req, res) => {
  const { items, address } = req.body;
  const userId = req.user._id;
  const { origin } = req.headers;

  if (!address || !items || items.length === 0) {
    throw new ApiError(400, "Address and Items are required");
  }

  let productData = [];
  let totalAmount = 0;

  for (const item of items) {
    const product = await Product.findById(item.product);

    // ফিক্স ১: সেফটি গার্ড সবার আগে (Crash Prevention)
    if (!product) {
      throw new ApiError(404, `Product with ID ${item.product} not found`);
    }

    productData.push({
      name: product.name,
      price: product.offerPrice || product.price, // ফলব্যাক প্রাইস অ্যাড করা হলো
      quantity: item.quantity,
    });

    totalAmount += (product.offerPrice || product.price) * item.quantity;
  }

  // 2% ট্যাক্স বা চার্জ যোগ করা হচ্ছে
  const finalAmount = totalAmount + Math.floor(totalAmount * 0.02);

  const createOrder = await Order.create({
    userId,
    items,
    amount: finalAmount,
    address,
    paymentType: "online",
    status: "Payment Pending", // এন্টারপ্রাইজ স্ট্যান্ডার্ড: পেমেন্ট হওয়ার আগে স্ট্যাটাস পেন্ডিং থাকবে
  });

  if (!createOrder) {
    throw new ApiError(500, "Failed to create order in database");
  }

  // Stripe Gateway Initialize
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

  // Create Line items for Stripe
  const line_items = productData.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.floor(item.price + item.price * 0.02) * 100, // Stripe সেন্টস (cents) এ ডাটা রিসিভ করে
      },
      quantity: item.quantity,
    };
  });

  // Create Checkout Session
  const session = await stripeInstance.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${origin}/loader?next=my-orders`,
    cancel_url: `${origin}/cart`,
    metadata: {
      // ফিক্স ২: order এর বদলে createOrder._id ব্যবহার করা হলো
      orderId: createOrder._id.toString(),
      userId: userId.toString(),
    },
  });

  if (!session) {
    throw new ApiError(500, "Failed to initialize Stripe session");
  }

  // ফিক্স ৩: ফ্রন্টএন্ডে রিডাইরেক্ট করার জন্য session_url পাঠানো হলো
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { orderId: createOrder._id, session_url: session.url },
        "Session created, redirecting to Stripe",
      ),
    );
});


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
