import prisma from "@/connection";
import { NextFunction, Request, Response } from "express";

export const getProductCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body

        const findUser = await prisma.user.findFirst({
            where: {
                id: userId
            },
            include: {
                cartProduct: {
                    include: {
                        Product: {
                            include: {
                                productImage: true
                            }
                        }
                    }
                }
            }
        })

        const dataCart = findUser?.cartProduct.map((item) => {
            return {
                id: item?.id,
                price: item?.price,
                productId: item?.productId,
                qty: item?.qty,
                size: item?.size,
                stock: item.Product.stock,
                imageUrl: item?.Product?.productImage[0]?.imageUrl,
                productName: item?.Product?.productName,
                createdAt: item?.createdAt
            }
        })

        const sortDataProduct = dataCart?.sort((a: any, b: any) => a?.createdAt - b?.createdAt)

        if (!findUser) throw { msg: 'Data tidak tersedia, atau user belum terdaftar', status: 406 }

        res.status(200).json({
            error: false,
            message: 'Data berhasil diambil',
            data: sortDataProduct
        })
    } catch (error) {
        next(error)
    }
}

export const updateCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, incrementId, decrementId } = req.body

        const findDataIncrement = await prisma.cartProduct.findFirst({
            where: {
                AND: [
                    { userId },
                    { id: incrementId }
                ]
            }
        })

        const findDataDecrement = await prisma.cartProduct.findFirst({
            where: {
                AND: [
                    { userId },
                    { id: decrementId }
                ]
            }
        })

        const findPriceProductDecrement = await prisma.product.findFirst({
            where: { id: findDataIncrement?.productId }
        })

        const findPriceProductIncrement = await prisma.product.findFirst({
            where: { id: findDataIncrement?.productId }
        })

        const priceDataIncrement = findPriceProductIncrement?.price as number
        const priceDataDecrement = findPriceProductDecrement?.price as number

        // if (!findDataIncrement || !findDataDecrement) throw { msg: 'User belum memilih product', status: 404 }

        if (findDataIncrement && incrementId) {
            const incrementData = findDataIncrement?.qty + 1

            await prisma.cartProduct.update({
                data: {
                    qty: incrementData,
                    price: priceDataIncrement * incrementData
                },
                where: { id: Number(findDataIncrement?.id), userId }
            })

        } else if (findDataDecrement && decrementId && findDataDecrement?.qty > 1) {
            const decrementData = findDataDecrement?.qty - 1

            await prisma.cartProduct.update({
                data: {
                    qty: decrementData,
                    price: priceDataDecrement * decrementData
                },
                where: { id: Number(findDataDecrement?.id), userId }
            })
        }

        res.status(200).json({
            error: false,
            message: 'Berhasil',
            data: {}
        })

    } catch (error) {
        next(error)
    }
}