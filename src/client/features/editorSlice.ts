import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorState, CodeExecutionResponse } from "../types";
import { client } from "../api/client";

export const editorSliceInitialState: EditorState = {
	isFullScreen: false,
	language: "java",
	boilerPlateCode: "",
	code: "",
	execution_result: {
		overallStatus: "",
		passed_testcases: 0,
		submissions: [],
	},
	error: null,
	loading: false
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


export const runCode = createAsyncThunk<CodeExecutionResponse, DefaultCodeProps>("/editor/runCode", async ({problemId, languageId, code}: DefaultCodeProps, thunkAPI) => {
	try {
		const res = await client.post('/problem/evaluate-code', {
			data: {
				problemId,
				languageId,
				code: code
			}
		})
		console.log('Result of evaluation: ', res.data);
		return res.data;
	}
	catch(error: any){
		console.log(error.message);
		return thunkAPI.rejectWithValue(error.message);
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
		builder.addCase(runCode.pending , (state) => {
			state.loading = true;
		})
		builder.addCase(runCode.fulfilled , (state, action) => {
			const { success, data } = action.payload;
			if (success){
				state.execution_result = data;
				state.loading = false;
			}
		})
		builder.addCase(runCode.rejected , (state, action) => {
			state.loading = false;
			state.error = action.error.message
		})
	}
	
});

export default editorSlice.reducer;
export const { setLanguage, toggleFullScreen, setCode } = editorSlice.actions;
