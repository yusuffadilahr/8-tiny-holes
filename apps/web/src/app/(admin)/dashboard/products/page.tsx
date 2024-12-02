'use client'

import { instance } from "@/utils/axios.instance";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { Button } from "@/components/ui/button";
import { FaPen, FaPenFancy, FaPlus, FaTrash } from "react-icons/fa";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createProductSchemas } from "@/features/(admin)/createProducts/schemas";

export default function Page() {
    const token = useSelector((state: any) => state?.auth?.user?.token)
    const [entriesPerPage, setEntriesPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)

    const { data: dataProducts, refetch } = useQuery({
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

    const { mutate: createProduct, isPending } = useMutation({
        mutationFn: async (fd: any) => {
            return await instance.post('/product/product-new', fd, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: (res) => {
            refetch()
            toast.success(res?.data?.message)
            console.log(res)
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message)
            console.log(err)
        }
    })

    const { mutate: handleDeleteProduct } = useMutation({
        mutationFn: async (id) => {
            return await instance.delete(`/product/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: (res) => {
            console.log(res)
            toast.success(res?.data?.message)
            refetch()
        },
        onError: (err:any) => {
            toast.error(err?.response?.data?.message)
            console.log(err)
        }
    })

    const paginatedData = dataProducts?.slice((currentPage - 1) * entriesPerPage, entriesPerPage)
    const sizeData = ['S', 'M', 'L', 'XL', 'ALL SIZE']

    return (
        <main className="w-full h-full bg-neutral-900 p-4 rounded-xl gap-2 flex flex-col">
            <section className="w-full h-20 flex bg-black rounded-xl">
            </section>
            <section className="w-full h-full bg-black rounded-xl text-white">
                <div className="w-full opacity-100 p-10">
                    <div className="w-full flex justify-end h-fit py-4">
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
                                            images: null,
                                            productName: "",
                                            description: '',
                                            size: [] as any,
                                            price: '',
                                            stock: '',
                                            category: ''
                                        }}

                                        validationSchema={createProductSchemas}

                                        onSubmit={(values) => {
                                            const fd = new FormData()

                                            fd.append('productName', values?.productName)
                                            fd.append('description', values?.description)
                                            fd.append('stock', values?.stock)
                                            fd.append('price', values?.price)
                                            fd.append('category', values?.category)

                                            values?.size.forEach((size: string) => {
                                                fd.append('size[]', size)
                                            })

                                            if (values?.images) {
                                                fd.append('images', values?.images)
                                            }

                                            createProduct(fd)
                                        }}>

                                        {({ setFieldValue, values }: any) => (
                                            <Form>
                                                <div className="w-full h-fit py-2">
                                                    <div className="md:flex w-full relative">
                                                        <label htmlFor='images'>P R O D U C T I M A G E <span className="text-red-500">*</span></label>
                                                        <ErrorMessage component='div' id="images" name="images" className="text-xs right-0 text-red-500 absolute" />
                                                    </div>
                                                    <Field
                                                        name='productImage'
                                                        id='productImage'
                                                        placeholder='Gambar Product'
                                                        type='file'
                                                        className='w-full mt-2 py-2 text-sm px-3 focus:outline-none border'
                                                        onChange={(e: any) => setFieldValue('images', e?.currentTarget.files[0])} />
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="w-full h-fit py-2">
                                                        <div className="md:flex w-full relative">
                                                            <label htmlFor='productName'>P R O D U C T N A M E <span className="text-red-500">*</span></label>
                                                            <ErrorMessage component='div' id="productName" name="productName" className="text-xs top-11 right-3 text-red-500 absolute" />
                                                        </div>
                                                        <Field name='productName'
                                                            id='productName'
                                                            placeholder='Nama Product'
                                                            type='text'
                                                            className='w-full mt-2 py-2 text-sm px-3 focus:outline-none border' />
                                                    </div>
                                                    <div className="w-full h-fit py-2">
                                                        <div className="md:flex w-full relative">
                                                            <label htmlFor='description'>D E S C R  I P T I O N <span className="text-red-500">*</span></label>
                                                            <ErrorMessage component='div' id="description" name="description" className="text-xs top-11 right-3 text-red-500 absolute" />
                                                        </div>
                                                        <Field name='description'
                                                            id='description'
                                                            placeholder='Deskripsi'
                                                            type='text'
                                                            className='w-full mt-2 py-2 text-sm px-3 focus:outline-none border' />
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="w-full h-fit py-2">
                                                        <div className="md:flex w-full relative">
                                                            <label htmlFor='price'>P R I C E <span className="text-red-500">*</span></label>
                                                            <ErrorMessage component='div' id="price" name="price" className="text-xs top-11 right-3 text-red-500 absolute" />
                                                        </div>
                                                        <Field name='price'
                                                            id='price'
                                                            placeholder='Harga Product'
                                                            type='text'
                                                            className='w-full mt-2 py-2 text-sm px-3 focus:outline-none border' />
                                                    </div>
                                                    <div className="w-full h-fit py-2">
                                                        <div className="md:flex w-full relative">
                                                            <label htmlFor='stock'>S T O C K <span className="text-red-500">*</span></label>
                                                            <ErrorMessage component='div' id="stock" name="stock" className="text-xs top-11 right-3 text-red-500 absolute" />
                                                        </div>
                                                        <Field name='stock'
                                                            id='stock'
                                                            placeholder='Stock Product'
                                                            type='text'
                                                            className='w-full mt-2 py-2 text-sm px-3 focus:outline-none border' />
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="w-full h-fit py-2">
                                                        <div className="md:flex w-full relative">
                                                            <label htmlFor='category'>C A T E G O R Y <span className="text-red-500">*</span></label>
                                                            <ErrorMessage component='div' id="category" name="category" className="text-xs top-11 right-10 text-red-500 absolute" />
                                                        </div>
                                                        <select name="category" id="category" value={values?.category || ''} onChange={(e) => setFieldValue('category', e?.target?.value)}
                                                            className='w-full mt-2 py-2 text-sm px-3 focus:outline-none border'>
                                                            <option value="" disabled>Select</option>
                                                            <option value="T-shirt">T-shirt</option>
                                                            <option value="Jacket">Jacket</option>
                                                            <option value="Caps">Caps</option>
                                                            <option value="Accessories">Accessories</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="md:flex w-full relative">
                                                        <label htmlFor='size'>S I Z E <span className="text-red-500">*</span></label>
                                                        <ErrorMessage component='div' id="size" name="size" className="text-xs top-2 right-3 text-red-500 absolute" />
                                                    </div>
                                                    <div className="w-full h-fit py-2 flex gap-4">
                                                        {sizeData?.map((item: any, index: any) => (
                                                            <div key={index} className="flex gap-2">
                                                                <Field type="checkbox" name="size" id='size'
                                                                    value={item}
                                                                    checked={values?.size?.includes(item)}
                                                                    onChange={() => {
                                                                        const newSize = values?.size?.includes(item) ?
                                                                            values?.size?.filter((s: any) => s !== item) :
                                                                            [...values?.size, item]

                                                                        setFieldValue('size', newSize)
                                                                    }}
                                                                />
                                                                <label htmlFor="size">{item}</label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <button disabled={isPending} type="submit" className="w-full py-2 bg-black hover:bg-neutral-800 text-white">SUBMIT</button>
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
                    <table className="w-full text-center text-sm">
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
                                    <td className="py-2 border text-white opacity-100 flex gap-2 justify-center">
                                        <button onClick={()=> handleDeleteProduct(item?.id)} className="py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500"><FaTrash /></button>
                                        <button className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500"><FaPen /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}