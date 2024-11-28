export const useProductsHooks = () => {
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
    return {
        getDataProducts
    }
}
