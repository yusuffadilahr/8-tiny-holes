import CardProduct from "@/components/core/cardProduct"
import { useProductsHooks } from "@/features/products/hooks"
import Image from "next/image"
import Link from "next/link"

export default async function Page() {
    const { getDataProducts } = useProductsHooks()
    const data = await getDataProducts()
    const dataProducts = data?.data

    return (
        <main className="w-full h-fit bg-white">
            <section className="flex justify-center items-center w-full h-fit py-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 w-full gap-4 px-2 md:px-10">
                    {dataProducts && (
                        dataProducts?.map((item: any, i: any) => (
                            <Link href={`/products/${item?.id}-16320-${item?.productName.toLowerCase()}`} key={i}>
                                <CardProduct
                                    itemName={item?.productName}
                                    imageUrl={item?.productImage[0]?.imageUrl}
                                    itemCategory={item?.category}
                                    itemPrice={item?.price.toString().toLocaleString('id-ID')}
                                />
                            </Link>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}