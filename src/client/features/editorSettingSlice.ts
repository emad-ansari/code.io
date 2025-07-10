import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingState } from "../lib/types";

export const settingState: SettingState = {
	fontSize: 16,
	theme: "vs-dark",
};

export const editorSettingSlice = createSlice({
	name: "setting",
	initialState: settingState,
	reducers: {
		setFontSize: (state, action: PayloadAction<number>) => {
			state.fontSize = action.payload;
		},
		setTheme: (state, action: PayloadAction<string>) => {
			state.theme = action.payload;
		},

	},
});

export default editorSettingSlice.reducer;
export const { setFontSize, setTheme } = editorSettingSlice.actions;
