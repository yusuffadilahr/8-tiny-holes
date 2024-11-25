import { NextFunction, Request, Response } from "express";

export const roleCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, authorizationRole } = req.body

        console.log(userId, '<user id dari roleCheck')
        console.log(authorizationRole, '<role dari roleCheck')
        
        if (authorizationRole != 'ADMIN') throw { msg: 'Mohon maaf, Anda tidak memiliki akses', status: 403 }

        if (userId && authorizationRole) {
            req.body.userId = userId
            req.body.authorizationRole = authorizationRole
        }

        next()
    } catch (error) {
        next(error)
    }
}