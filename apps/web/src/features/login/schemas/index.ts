import * as Yup from 'yup'

export const loginValidation = Yup.object().shape({
    email: Yup.string()
        .email('Email tidak valid!')
        .required('Email tidak boleh kosong!'),
        
    password: Yup.string().required('Password tidak boleh kosong!')
});