import express from "express";
import { authUser } from "../middleware/authUser.js";
import { addAddress, getAddress } from "../controllers/address.controller.js";

const addressRouter = express.Router();

addressRouter.post("/add", authUser, addAddress);
addressRouter.get("/list", authUser, getAddress);

export default addressRouter;
