'use client'
// import { setAddToCart } from "@/redux/slice/cartSlice";
import { instance } from "@/utils/axios.instance";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Page({ params }: any) {
    const [getSize, setGetSize] = useState('')
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
            window.location.href = '/cart'
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

    return (
        <main className="w-full h-fit bg-neutral-100 flex p-5 gap-2">
            <section className="w-full h-fit space-y-1">
                <div className="w-full h-[600px] bg-white">
                    <Image
                        width={500}
                        height={500}
                        alt="detail-product"
                        src={dataProduct?.productImage[0]?.imageUrl}
                        className="w-full h-[600px] object-cover"
                    />
                </div>
                {dataProduct?.productImage.length > 1 && (
                    <div className="flex w-full">
                        <div className="grid grid-cols-2 w-full gap-1">
                            {dataProduct?.productImage?.map((item: any, i: any) => (
                                <div key={i} className="w-full h-72 bg-white">
                                    <Image
                                        width={500}
                                        height={500}
                                        alt="detail-product"
                                        src={item?.imageUrl}
                                        className="w-full h-72 object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
            <section className="w-full h-fit space-y-4">
                <div className="w-full h-fit bg-white rounded-lg py-5 px-5">
                    <div className="flex flex-col w-full">
                        <h1>{dataProduct?.category.toUpperCase().split('').join(' ')}</h1>
                        <div className="w-full justify-between flex items-center py-3">
                            <h1 className="text-2xl font-semibold">{dataProduct?.productName}</h1>
                            <h1 className="text-2xl">${dataProduct?.price.toLocaleString('id-ID')},00</h1>
                        </div>
                        <div className="w-full flex flex-col py-5 border-t">
                            <h1 className="py-2">S I Z E :</h1>
                            <div className="w-full flex gap-5">
                                {dataProduct?.sizeChart?.map((item: any, i: any) => (
                                    <button onClick={(e: any) => setGetSize(e.target.value)} value={item?.size}
                                        className={`
                                     border w-10 h-10 flex items-center justify-center 
                                      ${getSize === item.size ? 'bg-black text-white scale-105' : 'bg-white text-black'}
                                     `} key={i}>
                                        {item?.size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="w-full flex flex-col py-5 border-t">
                            <h1 className="py-2">D E S C R I P T I O N :</h1>
                            <div className="w-full flex gap-5">
                                <h1>{dataProduct?.description}</h1>
                            </div>
                        </div>
                        <div className="w-full">
                            <button type="button" onClick={() => handleAddCart()} disabled={selectedSize == undefined || isPending ? true : false} className="w-full disabled:bg-neutral-700 py-2 text-center border bg-black text-white hover:bg-neutral-900">A D D T O C A R T</button>
                        </div>
                    </div>
                </div>
                <div className="w-full h-fit bg-white rounded-lg py-5 px-5">
                    <h1 className="py-5 text-xl text-center w-full font-semibold">S I Z E C H A R T</h1>
                    <div className="flex flex-col w-full text-neutral-600 border-t py-4">
                        <table>
                            <thead>
                                <tr>
                                    <th>S I Z E</th>
                                    <th>C H E S T</th>
                                    <th>L E N G T H</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sizeChart?.map((s, i) => (
                                    <tr key={i} className="text-center">
                                        <td className="py-2 border-r">{s?.size}</td>
                                        <td className="py-2">{s?.chest}</td>
                                        <td className="py-2 border-l">{s?.length}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            {/* {detail} */}
        </main>
    );
}