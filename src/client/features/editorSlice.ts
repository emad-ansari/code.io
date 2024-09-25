import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorState } from "../types";

import { client } from "../api/client";

export const editorSliceInitialState: EditorState = {
	isFullScreen: false,
	language: "java",
	boilerPlateCode: "",
	code: ""
};


interface DefaultCodeProps {
	problemId: string;
	languageId: number;
	code?: string;
}
export const getDefaultCode = createAsyncThunk("/editor/getDefaultCode", async ({problemId, languageId}: DefaultCodeProps, _) => {
	try {
		const res = await client.get('/problem/default-code', {
			params: {
				problemId,
				languageId
			}
		})
		return res.data;
	}
	catch(error: any){
		console.log(error.message);
	}
})


export const runCode = createAsyncThunk("/editor/runCode", async ({problemId, languageId, code}: DefaultCodeProps, _) => {
	try {
		const res = await client.get('/problem/evaluate-code', {
			data: {
				problemId,
				languageId,
				code: code

			}
		})
		console.log(res.data);
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
		setCode: (state, action: PayloadAction<string>) => {
			state.code = action.payload;
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
export const { setLanguage, toggleFullScreen, setCode } = editorSlice.actions;
