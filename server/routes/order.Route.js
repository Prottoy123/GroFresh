import express from "express";
import { authUser } from "../middleware/authUser.js";
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from "../controllers/order.controller.js";
import { authSeller } from "../middleware/authSeller.js";

const orderRouter = express.Router();
orderRouter.route("/cod").post(authUser, placeOrderCOD)
orderRouter.route("/user").get(authUser, getUserOrders)
orderRouter.route("/seller").get(authSeller, getAllOrders)
orderRouter.route("/stripe").post(authUser, placeOrderStripe);

export default orderRouter;
