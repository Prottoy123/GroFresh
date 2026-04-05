import express from "express";
import { authSeller } from "../middleware/authSeller.js";
import { upload } from "../middleware/multer.js";
import {
  changeStock,
  createProduct,
  productList,
  productById, 
} from "../controllers/product.controller.js";

const ProductRouter = express.Router();

// 1. Add Product (POST)
ProductRouter.route("/add").post(
  authSeller,
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  createProduct,
);

ProductRouter.route("/list").get(productList);
ProductRouter.route("/:id").get(productById);
ProductRouter.route("/stock/:id").patch(authSeller, changeStock);

export default ProductRouter;
