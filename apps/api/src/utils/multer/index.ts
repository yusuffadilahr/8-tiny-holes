import multer from 'multer'

const storage = multer.memoryStorage()

const fileFilter = (req: any, file: any, cb: any) => {
    const fileFormat = ['jpg', 'png', 'jpeg', 'webp', 'svg']

    const imagesExtension = file?.originalname?.split('.')
    if (!fileFormat.includes(imagesExtension[imagesExtension?.length - 1])) {
        return cb(new Error('Format tidak didukung'))
    }
    return cb(null, true)
}

export const uploadMulter = multer({
    fileFilter: fileFilter,
    storage: storage,
    limits: { fileSize: 5000000 }
})