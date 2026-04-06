import express from "express";
import { isSellerAuth, sellerLogin, sellerLogout } from "../controllers/seller.controller.js";
import { authSeller } from "../middleware/authSeller.js";

const sellerRouter = express.Router();

// Routes
sellerRouter.post("/login", sellerLogin);
sellerRouter.post("/logout", authSeller, sellerLogout);
sellerRouter.get("/is-seller-auth", authSeller,isSellerAuth);

export default sellerRouter;
