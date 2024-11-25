'use client'
import { keepAuth } from "@/redux/slice/authSlice";
import { instance } from "@/utils/axios.instance";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AuthProviders({ children }: { children: ReactNode }) {
    const token = useSelector((state: any) => state.auth.user)
    const dispatch = useDispatch()
    const displayDataUser = async () => {
        try {
            const res = await instance.get('/user/keep-auth', {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            })

            dispatch(keepAuth({
                email: res?.data?.data?.email,
                role: res?.data?.data?.role,
                name: res?.data?.data?.name
            }))

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (token) {
           displayDataUser()
        }
    }, [token])
    
    return (
        <>
            {children}
        </>
    );
}