import { configureStore } from "@reduxjs/toolkit";
import problemReducer from "../features/problemSlice";
import dropDownReducer from "../features/dropDownSlice";
import filterReducer from '../features/filterSlice'
import settingReducer from '../features/editorSettingSlice'
import editorReducer from '../features/editorSlice'
import { useDispatch } from "react-redux";

export const store = configureStore({
	reducer: {
		problem: problemReducer,
		dropdown: dropDownReducer,
		filter: filterReducer,
		setting: settingReducer,
		editor: editorReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
