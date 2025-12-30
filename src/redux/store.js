import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { userPersist } from './persistConfig/userPersist';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productSlice';
import { cartPersist } from "./persistConfig/cartPersist";

const persistedUserReducer = persistReducer(
    userPersist,
    userReducer
)

const persistedCartReducer = persistReducer(
    cartPersist,
    cartReducer
)

export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        cart: persistedCartReducer,
        products: productsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // ✅ REQUIRED
        }),
});

export const persistor = persistStore(store); 