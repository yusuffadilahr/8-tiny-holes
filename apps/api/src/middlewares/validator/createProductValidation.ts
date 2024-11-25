import { body } from "express-validator";

export const createProductValidation = [
    body(['productName',
        'description',
        'stock',
        'price',
        'category',
        'size']).isString().isEmpty().withMessage('Harap diisi terlebih dahulu'),
    body('productName').isString().escape(),
    body('description').isString().escape(),
    body('stock').isString().escape(),
    body('category').isString().escape(),
    body('size').isString().escape()
]