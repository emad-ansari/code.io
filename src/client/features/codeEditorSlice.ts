import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/client/api/client";
import {
	EditorState,
	APIResponse,
	DefaultCodeProps,
	CodeExecutionResult,
	CodeExecutionProps
} from "@/client/lib/types";

export const codeEditorState: EditorState = {
	loading: false,
	error: null,
	isFullScreen: false,
	language: localStorage.getItem("selectedLanguage") || "java",
	code: "",
	submission_result: {
		passed_testcases: -1,
		submissions: []
	}
};


export const fetchDefaultCode = createAsyncThunk<
	APIResponse<{boiler_code: string}>,
	DefaultCodeProps
>(
	"/editor/fetchDefaultCode",
	async ({ problemId, language }: DefaultCodeProps, thunkAPI) => {
		try {
			const res = await api.get('/problem/default-code', {
				params: {
					language,
					problemId
				}
			})
			console.log('default code: ', res.data)
			return res.data;

		} catch (error: any) {
			return thunkAPI.rejectWithValue(
				error.message || "Error occurred while fetching default code."
			);
		}
	}
);

export const runCode = createAsyncThunk<APIResponse<CodeExecutionResult>, CodeExecutionProps>(
	"/editor/runCode",
	async ({ problemId, language, code }, thunkAPI) => {
		try {
			const res = await api.post(
				"/submission/run-code",
				{
					data: {
						problemId,
						language,
						code,
					},
				}
			);
			console.log("run code repsonse: ", res.data)
			return res.data;
		} catch (error: any) {
			console.log(error.message);
			return thunkAPI.rejectWithValue(error.message || "Error while  running code.");
		}
	}
);

// export const submitCode = createAsyncThunk(
// 	"/editor/submitCode",
// 	async ({ problemTitle, languageId, code } thunkAPI) => {
// 		try {
// 			const res = await api.post<CodeExecutionResponse>(
// 				"/submission/submit-code",
// 				{
// 					data: {
// 						problemTitle,
// 						languageId,
// 						code: code,
// 					},
// 				}
// 			);
// 			return res.data;
// 		} catch (error: any) {
// 			console.log(error.message);
// 			return thunkAPI.rejectWithValue(error.message || "Error while  running code.");
// 		}
// 	}
// );



export const codeEditorSlice = createSlice({
	name: "editor",
	initialState: codeEditorState,
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
		builder.addCase(fetchDefaultCode.pending, (_, action) => {
			console.log(action.payload);
		});
		builder.addCase(fetchDefaultCode.fulfilled, (state, action) => {
			const { success, msg, data } = action.payload;
			console.log("message of deffault code: ", msg);
			if (success && data) {
				state.code = data.boiler_code
			}
		});
		builder.addCase(fetchDefaultCode.rejected, (_, action) => {
			console.log(action.payload);
		});
		builder.addCase(runCode.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(runCode.fulfilled, (state, action: PayloadAction<APIResponse<CodeExecutionResult>>) => {
			state.loading = false;
			const { success,msg, data } = action.payload;
			if (success && data) {
				state.submission_result = data;
			}
			console.log('run code messsage: ', msg);
		});
		builder.addCase(runCode.rejected, (state, action) => {
			state.loading = false;
		});
		// builder.addCase(submitCode.pending, (state) => {
		// 	state.loading = true;
		// });
		// builder.addCase(submitCode.fulfilled, (state, action) => {
		// 	const { success, data } = action.payload;
		// 	if (success) {
		// 		// state.execution_result = data;
		// 		state.loading = false;
		// 		console.log("submit code api response: ", data );
		// 	}
		// });
		// builder.addCase(submitCode.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.error = action.error.message;
		// });
	},
});

export default codeEditorSlice.reducer;
export const { setLanguage, toggleFullScreen, setCode } = codeEditorSlice.actions;
