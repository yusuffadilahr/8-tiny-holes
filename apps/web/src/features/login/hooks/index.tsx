'use client'

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/utils/axios.instance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { getToken } from "@/redux/slice/authSlice";
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

interface ILoginBody {
    email: string
    password: string
}
const secret_key = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY as string

export const useLoginHooks = () => {
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const router = useRouter()
    const { mutate: handleSubmitLogin, isPending } = useMutation({
        mutationFn: async ({ email, password }: ILoginBody) => {
            return await instance.post('/auth/login', {
                email, password
            })
        },
        onSuccess: (res) => {
            toast.success(res?.data?.message)
            dispatch(getToken(res?.data?.data))
            console.log(res)
            const roleUser = CryptoJS.AES.encrypt(res?.data?.data?.role, secret_key).toString()

            Cookies.set('_toksis', res?.data?.data?.token, { expires: 1 })
            Cookies.set('_roled', roleUser, { expires: 1 })
            
            res?.data?.data?.role != 'ADMIN' ? router.push('/') : router.push('/dashboard')
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message)
            console.log(err)
        }
    })

    const handleVisiblePassword = () => {
        setIsVisible(!isVisible)
        setTimeout(() => {
            setIsVisible(false)
        }, 5000)
    }

    return {
        handleSubmitLogin, isPending, handleVisiblePassword, isVisible, setIsVisible
    }
}