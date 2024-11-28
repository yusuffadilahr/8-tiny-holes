'use client'
import { useDetailProductHooks } from "@/features/products/detailProduct/hooks";
import Image from "next/image";

export default function Page({ params }: any) {
    const { setGetSize, getSize, selectedSize, handleAddCart, isPending, dataProduct, sizeChart } = useDetailProductHooks({ params })
    
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