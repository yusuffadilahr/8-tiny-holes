import prisma from "@/connection";
import { cloudinaryUpload } from "@/utils/cloudinary";
import { NextFunction, Request, Response } from "express";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imagesUpload: any = req?.files
        const { productName, description, stock, price, category, size /* size --> * Lempar dari frontend bentuk array ["S", "M", "L"]*/ } = req.body

        const findProducts = await prisma.product.findFirst({
            where: { productName }
        })

        if (findProducts && findProducts?.stock > 0) throw { msg: 'Product masih tersedia atau produk sudah ada', status: 400 }

        const productId = await prisma.product.create({
            data: {
                productName,
                description,
                stock: Number(stock),
                price: Number(price),
                category,
                sizeChart: {
                    create: size?.map((s: any) => {
                        return {
                            size: s
                        }
                    })
                }
            }
        })

        const imagesUploads = Array.isArray(imagesUpload?.images) ?
            await Promise.all(imagesUpload?.images?.map(async (item: any) => {
                const result: any = await cloudinaryUpload(item?.buffer)

                return {
                    imageUrl: result?.res,
                    productId: productId?.id
                }
            }))
            : []

        if (imagesUploads.length > 0) {
            await prisma.productImage.createMany({
                data: imagesUploads
            })
        } else {
            await prisma.productImage.create({
                data: {
                    imageUrl: 'https://spea.pt/image_default.png',
                    productId: productId?.id
                }
            })
        }

        res.status(200).json({
            error: false,
            message: 'Berhasil membuat data product',
            data: {}
        })

    } catch (error) {
        next(error)
    }
}

export const getDataProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const findProducts = await prisma.product.findMany({
            include: {
                productImage: true
            }
        })

        res.status(200).json({
            error: false,
            message: 'Berhasil mengambil data product',
            data: findProducts
        })
    } catch (error) {
        next(error)
    }
}

export const getDataProductsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const findProductsById = await prisma.product.findFirst({
            where: { id },
            include: {
                productImage: true,
                sizeChart: true
            }
        })

        res.status(200).json({
            error: false,
            message: 'Berhasil mengambil data',
            data: findProductsById
        })

    } catch (error) {
        next(error)
    }
}

export const addCartProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, qty, price, productId, size } = req.body

        const findCart = await prisma.cartProduct.findFirst({
            where: {
                userId: userId,
                productId,
                size
            }
        })

        if (findCart) {
            const updatedQuantity = findCart?.qty + Number(qty)
            const priceUpdate = price * updatedQuantity

            await prisma.cartProduct.update({
                data: { qty: Number(updatedQuantity), price: Number(priceUpdate), },
                where: { id: Number(findCart?.id), userId: userId }
            })

        } else {
            await prisma.cartProduct.create({
                data: {
                    userId,
                    qty: Number(qty),
                    price: Number(price),
                    productId,
                    size
                }
            })
        }

        res.status(201).json({
            error: false,
            message: 'Berhasil menambahkan product',
            data: {}
        })


    } catch (error) {
        next(error)
    }
}

export const deleteDataCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body
        const { id } = req.params

        const findCart = await prisma.cartProduct.findFirst({
            where: { id: Number(id), userId }
        })

        if (!findCart) throw { msg: 'Data tidak ada atau sudah terhapus!', status: 404 }

        await prisma.cartProduct.delete({ where: { id: Number(id), userId } })

        res.status(200).json({
            error: false,
            message: 'Berhasil menghapus dari keranjang',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}