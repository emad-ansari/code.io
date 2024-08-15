import { configureStore } from "@reduxjs/toolkit";
import problemReducer from "../features/problemSlice";
import dropDownReducer from "../features/dropDownSlice";
import filterReducer from '../features/filterSlice'
import { useDispatch } from "react-redux";

export const store = configureStore({
	reducer: {
		problem: problemReducer,
		dropdown: dropDownReducer,
		filter: filterReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
