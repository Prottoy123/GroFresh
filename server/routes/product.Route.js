import express from 'express';
import { sellerLogin, sellerlogout } from '../controllers/seller.controller';
import { authSeller } from '../middleware/authSeller';
import { upload } from '../middleware/multer';
import { changeStock, createProduct, productList } from '../controllers/product.controller.js';


const ProductRouter = express.Router();

ProductRouter.route("/add").post(
    upload.fields([
        {name:"image",maxCount:2}
    ]),authSeller,createProduct
)
ProductRouter.route("/list").get(productList);
ProductRouter.route("/product-by-id").get(productList);
ProductRouter.route("/stock").post(authSeller,changeStock);



export default ProductRouter;