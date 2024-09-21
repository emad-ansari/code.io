import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorState } from "../types";

import { client } from "../api/client";

export const editorSliceInitialState: EditorState = {
	isFullScreen: false,
	language: "java",
	boilerPlateCode: "",
};


interface DefaultCodeProps {
	problemId: string;
	languageId: number;
}
export const getDefaultCode = createAsyncThunk("/editor/getDefaultCode", async ({problemId, languageId}: DefaultCodeProps, _) => {
	try {
		console.log('this is langugage id: ',  languageId)
		const res = await client.get('/problem/default-code', {
			params: {
				problemId,
				languageId
			}
		})
		console.log('default code: ', res.data);
		return res.data;
	}
	catch(error: any){
		console.log(error.message);
	}
})


export const editorSlice = createSlice({
	name: "editor",
	initialState: editorSliceInitialState,
	reducers: {
		setLanguage: (state, action: PayloadAction<string>) => {
			state.language = action.payload;
		},
		toggleFullScreen: (state, action: PayloadAction<boolean>) => {
			state.isFullScreen = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getDefaultCode.pending , (_, action) => {
			console.log(action.payload);
		})
		builder.addCase(getDefaultCode.fulfilled , (state, action: PayloadAction<{message: string, defaultCode: string}>) => {
			console.log(action.payload);
			const { message } = action.payload;
			if (message == 'success' ){
				const { defaultCode } = action.payload;
				state.boilerPlateCode = defaultCode;
			}

		})
		builder.addCase(getDefaultCode.rejected , (_, action) => {
			console.log(action.payload);
		})
	}
	
});

export default editorSlice.reducer;
export const { setLanguage, toggleFullScreen } = editorSlice.actions;
