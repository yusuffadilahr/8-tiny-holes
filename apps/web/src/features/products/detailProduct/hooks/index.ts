'use client'

import { updateCart } from '@/redux/slice/authSlice'
import { instance } from '@/utils/axios.instance'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

export const useDetailProductHooks = ({ params }: any) => {
    const [getSize, setGetSize] = useState('')
    const dispatch = useDispatch()
    const token = useSelector((state: any) => state.auth.user.token)
    console.log(token)
    const { detail } = params
    const productId = detail?.split('-16320-')[0]

    const { data: dataProduct } = useQuery({
        queryKey: ['get-data-product'],
        queryFn: async () => {
            const res = await instance.get(`/product/detail/${productId}`)
            return res?.data?.data
        }
    })

    const selectedSize = dataProduct?.sizeChart.find((cart: any) => cart?.size === getSize)

    const { mutate: handleAddCart, isPending } = useMutation({
        mutationFn: async () => {
            return await instance.post('/product/add-to-cart', {
                qty: 1,
                price: dataProduct?.price,
                productId,
                size: getSize
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: (res) => {
            toast.success(res?.data?.message)
            dispatch(updateCart(true))
            console.log(res)
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message)
        }
    })

    const sizeChart = [
        { "size": "S", "chest": "90 cm", "length": "60 cm" },
        { "size": "M", "chest": "95 cm", "length": "65 cm" },
        { "size": "L", "chest": "100 cm", "length": "70 cm" },
        { "size": "XL", "chest": "105 cm", "length": "75 cm" },
        { "size": "XXL", "chest": "110 cm", "length": "80 cm" }
    ]

    console.log(params, 'dari hooks nih brayyyyy')

    return {
        setGetSize, getSize, token, detail, selectedSize, handleAddCart, isPending, dataProduct, sizeChart
    }
}