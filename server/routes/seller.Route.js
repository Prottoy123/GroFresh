import express from "express";
import { sellerLogin, sellerLogout } from "../controllers/seller.controller.js";
import { authSeller } from "../middleware/authSeller.js";

const sellerRouter = express.Router();

// Routes
sellerRouter.post("/login", sellerLogin);
sellerRouter.post("/logout", authSeller, sellerLogout);

export default sellerRouter;
