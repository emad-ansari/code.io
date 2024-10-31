import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorState, CodeExecutionResponse, APIResponse } from "../types";
import { api } from "../api/client";

export const editorSliceInitialState: EditorState = {
	isFullScreen: false,
	language: "java",
	boilerPlateCode: "",
	code: "",
	execution_result: {
		overallStatus: "",
		passed_testcases: -1,
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

type fetchDefaultCodeProps = Pick<DefaultCodeProps, "languageId"> & {problemTitle: string};


export const fetchDefaultCode = createAsyncThunk<APIResponse<{defaultCode: string}>, fetchDefaultCodeProps>("/editor/getDefaultCode", async ({problemTitle, languageId}: fetchDefaultCodeProps, thunkAPI ) => {
	try {
		console.log('problem title and langid:  ', problemTitle, languageId);

		const res = await api.get('/problem/default-code', {
			params: {
				problemTitle,
				languageId
			}
		})
		if (res.data.success && res.data.defaultCode){
			thunkAPI.dispatch(setCode(res.data.defaultCode));
		}
		console.log('default code api response: ', res.data)
		return res.data;
	}
	catch(error: any){
		console.log(error.message);
	}
})


export const runCode = createAsyncThunk<CodeExecutionResponse, DefaultCodeProps>("/editor/runCode", async ({problemId, languageId, code}: DefaultCodeProps, thunkAPI) => {
	try {
		console.log('check run code ', problemId)
		console.log('user code: ',code)
		const res = await api.post('/problem/run-code', {
			data: {
				problemId,
				languageId,
				code: code
			}
		})
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
		builder.addCase(fetchDefaultCode.pending , (_, action) => {
			console.log(action.payload);
		})
		builder.addCase(fetchDefaultCode.fulfilled , (state, action) => {
			const { success, message, data } = action.payload;
			console.log('message of deffault code: ', message)
			if ( success && data){
				const { defaultCode } = data;
				state.boilerPlateCode = defaultCode;
			}
		})
		builder.addCase(fetchDefaultCode.rejected , (_, action) => {
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
