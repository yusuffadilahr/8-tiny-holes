import * as Yup from 'yup'

export const createProductSchemas = Yup.object().shape({
    images: Yup.mixed().required('Wajib diisi!'),
    productName: Yup.string().required('Wajib diisi!'),
    description: Yup.string().required('Wajib diisi!'),
    category: Yup.string().required('Wajib diisi!'),
    stock: Yup.number().typeError('Harap masukan angka').required('Wajib diisi'),
    price: Yup.number().typeError('Harap masukan angka').required('Wajib diisi'),
    size: Yup.array().of(Yup.string()).min(1, 'Pilih minimal 1 size').required('Wajib diisi')
})