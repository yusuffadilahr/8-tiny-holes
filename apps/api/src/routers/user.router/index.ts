import { keepAuthUser } from "@/controllers/user.controller";
import { tokenValidation } from "@/middlewares/verifyToken";
import { Router } from "express";

const userRouter = Router()
userRouter.get('/keep-auth', tokenValidation, keepAuthUser)

export default userRouter