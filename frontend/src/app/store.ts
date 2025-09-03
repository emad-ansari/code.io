import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import problemReducer from "@/features/problemSlice";
import settingReducer from "@/features/editorSettingSlice";
import editorReducer from "@/features/codeEditorSlice";
import authSlice from "@/features/authSlice";
import ProblemCategorySlice from "@/features/problemCategorySlice";
import userSlice from '@/features/userSlice'

export const store = configureStore({
	reducer: {
		problem: problemReducer,
		setting: settingReducer,
		editor: editorReducer,
		user: userSlice,
		auth: authSlice,
		problem_category: ProblemCategorySlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
