import { createProduct } from "@/controllers/product.controller";
import { roleCheck } from "@/middlewares/roleCheck";
import { uploader } from "@/middlewares/uploader";
import { createProductValidation } from "@/middlewares/validator/createProductValidation";
import { tokenValidation } from "@/middlewares/verifyToken";
import { Router } from "express";

const productRouter = Router()
productRouter.post('/product-new', createProductValidation, tokenValidation, roleCheck, uploader, createProduct)
export default productRouter