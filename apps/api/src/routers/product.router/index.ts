import { addCartProduct, createProduct, getDataProducts, getDataProductsById } from "@/controllers/product.controller";
import { roleCheck } from "@/middlewares/roleCheck";
import { uploader } from "@/middlewares/uploader";
import { createProductValidation } from "@/middlewares/validator/createProductValidation";
import { tokenValidation } from "@/middlewares/verifyToken";
import { Router } from "express";

const productRouter = Router()
productRouter.get('/', getDataProducts)
productRouter.get('/detail/:id', getDataProductsById)
productRouter.post('/product-new', createProductValidation, tokenValidation, roleCheck, uploader, createProduct)
productRouter.post('/add-to-cart', tokenValidation, addCartProduct)
export default productRouter