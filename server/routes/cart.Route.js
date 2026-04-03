
import mongoose from 'mongoose';
import express from 'express';
import { authUser } from '../middleware/authUser.js';
import { updateCart } from '../controllers/cart.controller.js';

const cartRouter = express.Router();

cartRouter.route("/update").post(authUser,updateCart);

export default cartRouter;