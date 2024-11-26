// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         cart: []
//     },
//     reducers: {
//         setAddToCart: (state: any, action) => {
//             const { productId, size, price } = action.payload

//             const existingProduct = state.cart.findIndex((item: any) => item?.productId == productId && item?.size == size)

//             if (existingProduct != -1) {
//                 state.cart[existingProduct].qty += 1
//                 state.cart[existingProduct].price = price * state.cart[existingProduct].qty
//             } else {
//                 state.cart.push({
//                     productId,
//                     size,
//                     price,
//                     qty: 1
//                 })
//             }
//         }
//     }
// })

// export const { setAddToCart } = cartSlice.actions
// export default cartSlice.reducer /* -> cartReducer  */