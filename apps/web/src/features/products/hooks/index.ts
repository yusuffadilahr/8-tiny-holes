'use client'

import { instance } from "@/utils/axios.instance"
import { useQuery } from "@tanstack/react-query"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

export const useProductsHooks = () => {
    const params = useSearchParams()
    const [sortedName, setSortedName] = useState(params.get('sort') || '')
    const [inputSearch, setInputSearch] = useState(params.get('search') || '')
    const [categorySearch, setCategorySearch] = useState(params.get('category') || '')

    const router = useRouter()
    const pathname = usePathname()

    const debounce = useDebouncedCallback(
        (values) => {
            setInputSearch(values)
        }, 500)

    const { data: dataProducts, refetch } = useQuery({
        queryKey: ['get-data-products', sortedName, inputSearch, categorySearch],
        queryFn: async () => {
            const res = await instance.get('/product', {
                params: {
                    sorted: sortedName,
                    search: inputSearch,
                    category: categorySearch
                }
            })

            return res?.data?.data
        }
    })

    useEffect(() => {
        const searchParams = new URLSearchParams(params);

        if (sortedName) {
            searchParams.set('sort', sortedName);
        } else {
            searchParams.delete('sort');
        }

        if (inputSearch) {
            searchParams.set('search', inputSearch);
        } else {
            searchParams.delete('search');
        }

        if (categorySearch) {
            searchParams.set('category', categorySearch);
        } else {
            searchParams.delete('category');
        }

        router.push(`${pathname}?${searchParams.toString()}`);
        router.refresh()
        refetch();

    }, [sortedName, inputSearch, categorySearch, params, pathname, refetch]);

    return {
        setSortedName, dataProducts, sortedName, debounce, setInputSearch, inputSearch, categorySearch, setCategorySearch
    }
}
