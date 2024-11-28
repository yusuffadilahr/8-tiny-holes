'use client'

import { updateCart } from '@/redux/slice/authSlice'
import { instance } from '@/utils/axios.instance'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

export const useCartHooks = () => {
    const token = useSelector((state: any) => state?.auth?.user?.token)
    
    const dispatch = useDispatch()
    const { data: getCart, refetch } = useQuery({
        queryKey: ['get-data'],
        queryFn: async () => {
            const res = await instance.get('/cart', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res)
            return res?.data?.data
        }
    })

    const { mutate: handleDelete } = useMutation({
        mutationFn: async (id) => {
            const result = await Swal.fire({
                title: "Apakah anda yakin ingin menghapus?",
                text: "Produk akan dihapus dari keranjang anda.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Konfirmasi",
                cancelButtonText: "Batal"
            });

            if (result?.isConfirmed) {
                return await instance.delete(`/product/detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            }
        },
        onSuccess: (res) => {
            if (res) {
                toast.success(res?.data?.message)
                refetch()
                dispatch(updateCart(true))
            }
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message)
        }
    })

    const { mutate: handleIncrementData } = useMutation({
        mutationFn: async (id: number) => {
            console.log(id)
            return await instance.patch('/cart', {
                incrementId: Number(id)
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: (res) => {
            refetch()
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message)
        }
    })

    const { mutate: handleDecrementData } = useMutation({
        mutationFn: async (id: number) => {
            return await instance.patch('/cart', {
                decrementId: Number(id)
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: (res) => {
            refetch()
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message)
        }
    })

    const totalPrice = getCart?.reduce((acc: any, item: any) => acc + item?.price, 0)
    const totalQuantity = getCart?.reduce((acc: any, item: any) => acc + item?.qty, 0)

    return {
        getCart, refetch, token, handleDelete, handleIncrementData, handleDecrementData, totalPrice, totalQuantity
    }
}