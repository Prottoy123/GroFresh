

import express from 'express';
import { sellerLogin, sellerlogout } from '../controllers/seller.controller';
import { authSeller } from '../middleware/authSeller';

const sellerRouter = express.Router();

sellerRouter.post('/login',sellerLogin)
sellerRouter.post("/logout", authSeller , sellerlogout);



export default sellerRouter