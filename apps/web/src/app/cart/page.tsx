'use client'

import { updateCart } from "@/redux/slice/authSlice";
// import { updateCart } from "@/redux/slice/authSlice";
import { instance } from "@/utils/axios.instance";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Page() {
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
            console.log(res)
        },
        onError: (err) => {
            console.log(err)
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
            console.log(res)
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const totalPrice = getCart?.reduce((acc: any, item: any) => acc + item?.price, 0)
    const totalQuantity = getCart?.reduce((acc: any, item: any) => acc + item?.qty, 0)

    return (
        <main className={`w-full ${getCart?.length > 1 ? 'h-fit' : 'lg:h-[80vh]'} py-5 flex bg-black gap-2 px-2`}>
            <section className="w-full h-fit space-y-4">
                <div className="w-full h-12 rounded-lg bg-white flex items-center">
                    <h1 className="w-full font-bold text-center text-xl">C A R T</h1>
                </div>
                {getCart?.length > 0 ? getCart?.map((item: any, i: any) => (
                    <div key={i} className="w-full flex items-center justify-between h-fit bg-white rounded-lg py-5 px-10">
                        <div className="w-44 h-44">
                            <Image
                                width={500}
                                height={500}
                                src={item?.imageUrl}
                                alt="detail-trx"
                                className="w-44 h-44 object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-5 items-center">
                            <div className="flex flex-col">
                                <h1 className="font-semibold">{item?.productName}</h1>
                                <h1 className="text-neutral-500 text-xs">{item?.size}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex w-full gap-4 justify-end items-center">
                                <button disabled={item?.qty == 1 ? true : false} onClick={() => handleDecrementData(item?.id)} className="border px-2 py-1">-</button>
                                <span>{item?.qty}</span>
                                <button onClick={() => handleIncrementData(item?.id)} className="border px-2 py-1">+</button>
                                <button onClick={() => handleDelete(item?.id)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                        <div className="flex">
                            <h1>${item?.price.toLocaleString('en-US')},00</h1>
                        </div>
                    </div>
                )) :
                    <div className="w-full flex items-center justify-center h-fit bg-white rounded-lg py-5 px-10">
                        <div className="flex flex-col gap-5 items-center py-16">
                            <h1 className="font-bold">BELUM ADA DATA</h1>
                        </div>
                    </div>}
            </section>
            <section className="w-1/2 h-[80vh] py-6 px-5 bg-white rounded-lg">
                <div className="w-full py-2 flex text-center">
                    <h1 className="w-full font-bold text-xl">T O T A L</h1>
                </div>
                <div className="w-full flex justify-between py-2">
                    <h1>T O T A L I T E M</h1>
                    <h1>{totalQuantity ? totalQuantity : '0'}</h1>
                </div>
                <div className="w-full flex justify-between py-2">
                    <h1>T O T A L P R I C E</h1>
                    <h1>{totalPrice ? <span>${totalPrice.toLocaleString('en-US')},00</span> : '0'}</h1>
                </div>
                <div className="py-4 flex">
                    <button className="w-full bg-black text-white py-2">B U Y</button>
                </div>
            </section>
        </main>
    );
}