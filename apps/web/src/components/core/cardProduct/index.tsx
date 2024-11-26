import Image from "next/image";

export default function CardProduct({ itemName, imageUrl, itemCategory, itemPrice }: any) {
    return (
        <div className="h-fit w-full bg-white border transition-all duration-75 hover:scale-105">
            <div className="w-full h-52">
                <Image
                    width={500}
                    height={500}
                    alt="product"
                    src={imageUrl}
                    className="h-52 object-cover w-full"
                />
            </div>
            <div className="text-black flex flex-col items-center py-2">
                <div className="text-xs">
                    <h1 className="text-neutral-500">{itemCategory}</h1>
                </div>
                <h1 className="text-sm">{itemName}</h1>
                <h1 className="text-sm">${itemPrice}</h1>
            </div>
        </div>
    );
}