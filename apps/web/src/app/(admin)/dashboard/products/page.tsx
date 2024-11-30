'use client'

import { instance } from "@/utils/axios.instance";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import InputForm from "@/components/core/inputForm";
import { Form, Formik } from "formik";

export default function Page() {
    const [entriesPerPage, setEntriesPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)

    const { data: dataProducts } = useQuery({
        queryKey: ['get-data-products'],
        queryFn: async () => {
            const res = await instance.get('/product',
                //     {
                //     params: {
                //         sorted: sortedName,
                //         search: inputSearch,
                //         category: categorySearch
                //     }
                // }
            )

            return res?.data?.data
        }
    })

    const paginatedData = dataProducts?.slice((currentPage - 1) * entriesPerPage, entriesPerPage)

    return (
        <main className="w-full h-full bg-neutral-900 p-4 rounded-xl gap-2 flex flex-col">
            <section className="w-full h-20 flex bg-black rounded-xl">
            </section>
            <section className="w-full h-full bg-black rounded-xl text-white">
                <div className="w-full opacity-100 p-10">
                    <div className="w-full flex justify-end h-fit py-4">
                        {/* <button className="py-2 px-3 flex items-center text-sm gap-2 rounded-full bg-white hover:bg-neutral-200 text-black">
                            <FaPlus /> Upload Products</button> */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="text-black rounded-full flex">
                                    <FaPlus /> Upload Product</Button>
                            </DialogTrigger>
                            <DialogContent className="w-full">
                                <DialogHeader>
                                    <DialogTitle>Create Product</DialogTitle>
                                </DialogHeader>
                                <div className="w-full h-fit py-2">
                                    <Formik
                                        initialValues={{
                                            productName: "",
                                        }} onSubmit={(values) => {
                                            console.log(values)
                                        }}>

                                        {({ setFieldValue }: any) => (
                                            <Form>
                                                <InputForm
                                                    placeholder="Gambar Product"
                                                    htmlFor="productImage"
                                                    name="productImage"
                                                    type="file"
                                                    labelname="P R O D U C T N A M E"
                                                    id="productImage">
                                                    <span></span>
                                                </InputForm>
                                                <InputForm
                                                    placeholder="Nama Product"
                                                    htmlFor="productName"
                                                    name="productName"
                                                    type="text"
                                                    labelname="P R O D U C T N A M E"
                                                    id="productName">
                                                    <span></span>
                                                </InputForm>
                                                <InputForm
                                                    placeholder="Deskripsi"
                                                    htmlFor="description"
                                                    name="description"
                                                    type="text"
                                                    labelname="D E S C R I P T I O N"
                                                    id="description">
                                                    <span></span>
                                                </InputForm>
                                                <div className="flex gap-2">
                                                    <InputForm
                                                        placeholder="Harga"
                                                        htmlFor="price"
                                                        name="price"
                                                        type="text"
                                                        labelname="P R I C E"
                                                        id="price">
                                                        <span></span>
                                                    </InputForm>
                                                    <InputForm
                                                        placeholder="Stok"
                                                        htmlFor="stock"
                                                        name="stock"
                                                        type="text"
                                                        labelname="S T O C K"
                                                        id="stock">
                                                        <span></span>
                                                    </InputForm>
                                                </div>
                                                <div className="flex gap-2">
                                                    <InputForm
                                                        placeholder="Kategori"
                                                        htmlFor="category"
                                                        name="category"
                                                        type="text"
                                                        labelname="C A T E G O R Y"
                                                        id="category">
                                                        <span></span>
                                                    </InputForm>
                                                    <InputForm
                                                        placeholder="Ukuran"
                                                        htmlFor="size"
                                                        name="size"
                                                        type="text"
                                                        labelname="S I Z E"
                                                        id="size">
                                                        <span></span>
                                                    </InputForm>
                                                </div>
                                                <button type="submit">SUBMIT</button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                                {/* <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter> */}
                            </DialogContent>
                        </Dialog>
                    </div>
                    <table className="w-full text-center">
                        <thead>
                            <tr>
                                <th className="py-2 border text-white opacity-100">No</th>
                                <th className="py-2 border text-white opacity-100">Nama Products</th>
                                <th className="py-2 border text-white opacity-100">Stock</th>
                                <th className="py-2 border text-white opacity-100">Price</th>
                                <th className="py-2 border text-white opacity-100">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData?.map((item: any, i: number) => (
                                <tr key={i}>
                                    <td className="py-2 border text-white opacity-100">{i + 1}</td>
                                    <td className="py-2 border text-white opacity-100">{item?.productName}</td>
                                    <td className="py-2 border text-white opacity-100">{item?.stock}</td>
                                    <td className="py-2 border text-white opacity-100">${item?.price},00</td>
                                    <td className="py-2 border text-white opacity-100"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}