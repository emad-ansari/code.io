import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import problemReducer from "@/client/features/problemSlice";
import dropDownReducer from "@/client/features/dropDownSlice";
import filterReducer from "@/client/features/filterSlice";
import settingReducer from "@/client/features/editorSettingSlice";
import editorReducer from "@/client/features/codeEditorSlice";
import userSlice from "@/client/features/authSlice";
import ProblemCategorySlice from "@/client/features/problemCategorySlice"


export const store = configureStore({
	reducer: {
		problem: problemReducer,
		dropdown: dropDownReducer,
		filter: filterReducer,
		setting: settingReducer,
		editor: editorReducer,
		user: userSlice,
		problem_category :ProblemCategorySlice
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
