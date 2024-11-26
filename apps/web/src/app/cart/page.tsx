'use client'

import Image from "next/image";
import { useSelector } from "react-redux";

export default function Page() {
    const getCart = useSelector((state: any) => state?.auth?.user?.cart)

    return (
        <main className="w-full h-fit py-5 flex bg-black gap-2 px-2">
            <section className="w-full h-fit space-y-4">
                {getCart?.map((item: any, i: any) => (
                    <div key={i} className="w-full flex justify-between h-fit bg-white rounded-lg py-5 px-10">
                        <div className="w-44 h-44">
                            <Image
                                width={500}
                                height={500}
                                src={item?.imageUrl}
                                alt="detail-trx"
                                className="w-44 h-44 object-cover"
                            />
                        </div>
                        <div className="flex gap-4">
                            <h1>{item?.productName}</h1>
                            <h1>{item?.size}</h1>
                            <h1>{item?.qty}</h1>
                        </div>
                    </div>
                ))}
            </section>
            <section className="w-full h-screen px-1 bg-white rounded-lg">

            </section>
        </main>
    );
}