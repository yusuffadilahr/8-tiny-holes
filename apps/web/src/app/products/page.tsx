import CardProduct from "@/components/core/cardProduct"
import Image from "next/image"
import Link from "next/link"

const getDataProducts = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/product/', {
            cache: 'no-store'
        })

        const response = res.json()
        return response

    } catch (error) {
        console.log(error)
    }
}

export default async function Page() {
    const data = await getDataProducts()
    const dataProducts = data?.data

    return (
        <main className="w-full h-fit bg-white">
            <section className="flex justify-center items-center w-full h-fit py-10 bg-neutral-100">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full gap-4 px-5">
                    {dataProducts?.map((item: any, i: any) => (
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
            </section>
        </main>
    );
}