import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createFilter from "redux-persist-transform-filter";
import storage from 'redux-persist/lib/storage'
import authReducer from './slice/authSlice'
import { persistStore } from "redux-persist";
// import cartReducer from './slice/cartSlice'

const filteredState = createFilter(
    'user', ['token']
)

const persistConfig = {
    key: 'token',
    storage,
    transforms: [filteredState]
}

const persistedReducer: any = persistReducer(persistConfig, authReducer)

const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
})

export const persistedStore: any = persistStore(store)
export default store