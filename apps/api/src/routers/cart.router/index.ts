import { getProductCart, updateCart } from "@/controllers/cart.controller";
import { limiter } from "@/middlewares/rateLimiter";
import { tokenValidation } from "@/middlewares/verifyToken";
import { Router } from "express";

const cartRouter = Router()
cartRouter.get('/', tokenValidation, getProductCart)
cartRouter.patch('/', tokenValidation, updateCart)

export default cartRouter