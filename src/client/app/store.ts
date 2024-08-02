import { configureStore } from "@reduxjs/toolkit";
import problemReducer from "../features/problemSlice";
import problemFilterReducer from '../features/problemFilterSlice';
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        problem: problemReducer,
        filter: problemFilterReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch  = () => useDispatch<AppDispatch>();



