import { configureStore } from "@reduxjs/toolkit";
import problemReducer from "../features/problemSlice";
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        problem: problemReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch  = () => useDispatch<AppDispatch>();



