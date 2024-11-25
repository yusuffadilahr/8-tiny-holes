import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            token: '',
            role: '',
            name: '',
            email: ''
        }
    },
    reducers: {
        getToken: (state, action) => {
            state.user.token = action.payload.token
        },
        resetTokenLogout: (state, action) => {
            state.user.token = ''
            state.user.email = ''
            state.user.role = ''
            state.user.name = ''
        },
        keepAuth: (state, action) => {
            state.user.email = action.payload.email
            state.user.role = action.payload.role
            state.user.name = action.payload.name
        }
    }
})

export const { getToken, keepAuth, resetTokenLogout } = authSlice.actions
export default authSlice.reducer