import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            token: '',
            role: '',
            name: '',
            email: '',
            cart: null,
            cartUpdate: false,
            profile: ''
        }
    },
    reducers: {
        getToken: (state, action) => {
            state.user.token = action.payload.token
        },
        resetTokenLogout: (state, action) => {
            state.user = action.payload
        },
        keepAuth: (state, action) => {
            state.user.email = action.payload.email
            state.user.role = action.payload.role
            state.user.name = action.payload.name
            state.user.cart = action.payload.cart
            state.user.profile = action.payload.profile
        },
        updateCart: (state, action) => {
            state.user.cartUpdate = action.payload
        }
    }
})

export const { getToken, keepAuth, resetTokenLogout, updateCart } = authSlice.actions
export default authSlice.reducer