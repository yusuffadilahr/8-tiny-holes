'use client'

import { useCartHooks } from "@/features/cart/hooks";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

export default function Page() {
    const { getCart, handleDelete, handleIncrementData, handleDecrementData, totalPrice, totalQuantity } = useCartHooks()

    console.log(getCart, "<<< cek dah")
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
                                <button disabled={item?.qty == 1 ? true : false} onClick={() => handleDecrementData(item?.id)} className="border px-2 py-1 disabled:bg-neutral-300">-</button>
                                <span>{item?.qty}</span>
                                <button disabled={item?.qty >= item?.stock ? true : false} onClick={() => handleIncrementData(item?.id)} className="border px-2 py-1 disabled:bg-neutral-300">+</button>
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