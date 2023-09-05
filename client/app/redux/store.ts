import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { api } from "../apis";
import { rootReducer } from "./reducer";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window === "undefined"
        ? createNoopStorage()
        : createWebStorage("local");

const persistConfig = {
    key: "app",
    storage: storage,
    whitelist: ["auth",],
    blacklist: ["active", "messages"],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: pReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([api.middleware]),
    devTools: process.env.NODE_ENV !== "production",
});

const persist = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { persist, store };

