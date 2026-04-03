
import mongoose from 'mongoose';
import express from 'express';
import { authUser } from '../middleware/authUser.js';
import { updateCart } from '../controllers/cart.controller.js';
import { addAddress, getAddress } from '../controllers/address.controller.js';

const addressRouter = express.Router();

addressRouter.route("/add").post(authUser,addAddress);
addressRouter.route("/get").get(authUser,getAddress);

export default addressRouter;