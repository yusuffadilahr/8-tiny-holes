import prisma from "@/connection";
import { cloudinaryUpload } from "@/utils/cloudinary";
import { NextFunction, Request, Response } from "express";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imagesUpload: any = req?.files
        const { productName, description, stock, price, category, size /* size --> * Lempar dari frontend bentuk array ["S", "M", "L"]*/ } = req.body

        console.log(req.body, "<< cek dari controlller")
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