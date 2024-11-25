import { Router } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import productRouter from "./product.router";

const router = Router()
router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/product', productRouter)

export default router