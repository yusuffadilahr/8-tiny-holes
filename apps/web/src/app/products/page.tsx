'use client'

import CardProduct from "@/components/core/cardProduct"
import { useProductsHooks } from "@/features/products/hooks"
import Link from "next/link"
import React from "react"

export default function Page() {
    const { setSortedName, dataProducts, sortedName, debounce, categorySearch, setCategorySearch } = useProductsHooks()

    return (
        <main className="w-full h-fit bg-white">
            <section className="flex flex-col justify-center items-center w-full h-fit py-10">
                <div className="pb-10 flex w-full justify-start px-20 gap-5">
                    <select value={sortedName} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortedName(e.target.value)} className="text-neutral-400 cursor-pointer border-b py-2 px-1 focus:outline-none">
                        <option disabled value="" className="text-neutral-400">-- SELECT OPTION --</option>
                        <option value="sort_name_asc">Sort by Name (A-Z)</option>
                        <option value="sort_name_desc">Sort by Name (Z-A)</option>
                        <option value="sort_price_asc">Sort by Price (Low to High)</option>
                        <option value="sort_price_desc">Sort by Price (High to Low)</option>
                        <option value="">Reset</option>
                    </select>
                    <select value={categorySearch} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategorySearch(e.target.value)} className="text-neutral-400 cursor-pointer border-b py-2 px-1 focus:outline-none">
                        <option disabled value="" className="text-neutral-400">-- SELECT CATEGORY --</option>
                        <option value="t-shirt">T-Shirt</option>
                        <option value="jacket">Jacket</option>
                        <option value="caps">Caps</option>
                        <option value="pants">Pants</option>
                        <option value="shoes">Shoes</option>
                        <option value="accessories">Accessories</option>
                        <option value="">Reset</option>
                    </select>
                    <input onChange={(e) => debounce(e.target.value)} type="text" className="border-b focus:outline-none px-2" placeholder="S E A R C H" />
                </div>
                {dataProducts?.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 w-full gap-4 px-2 md:px-10">
                        {dataProducts?.map((item: any, i: number) => (
                            <Link href={`/products/${item?.id}-16320-${item?.productName.toLowerCase()}`} key={i}>
                                <CardProduct
                                    itemName={item?.productName}
                                    imageUrl={item?.productImage[0]?.imageUrl}
                                    itemCategory={item?.category}
                                    itemPrice={item?.price.toString().toLocaleString('id-ID')}
                                />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <section className="w-full h-screen flex justify-center bg-white">
                        <h1>P R O D U C T <span className="px-2">T I D A K</span> T E R S E D I A</h1>
                    </section>
                )}
            </section>
        </main>
    );
}