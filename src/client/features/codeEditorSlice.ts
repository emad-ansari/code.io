import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/client/api/client";
import {
	EditorState,
	CodeExecutionResponse,
	APIResponse,
	DefaultCodeProps
} from "@/client/lib/types";

export const codeEditorState: EditorState = {
	isFullScreen: false,
	language: localStorage.getItem("selectedLanguage") || "java",
	code: "",
	execution_result: {
		overallStatus: "",
		passed_testcases: -1,
		submissions: [],
	},
	error: null,
	loading: false,
};


export const fetchDefaultCode = createAsyncThunk<
	APIResponse<{ defaultCode: string }>,
	DefaultCodeProps
>(
	"/editor/fetchDefaultCode",
	async ({ problemTitle, languageId }: DefaultCodeProps, thunkAPI) => {
		try {
			const res = await api.get<APIResponse<{ defaultCode: string }>>(
				"/problem/default-code",
				{
					params: {
						problemTitle,
						languageId,
					},
				}
			);
			return res.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(
				error.message || "Error occurred while fetching default code."
			);
		}
	}
);

export const runCode = createAsyncThunk(
	"/editor/runCode",
	async ({ problemTitle, languageId, code }: DefaultCodeProps, thunkAPI) => {
		try {
			const res = await api.post<CodeExecutionResponse>(
				"/submission/run-code",
				{
					data: {
						problemTitle,
						languageId,
						code: code,
					},
				}
			);
			return res.data;
		} catch (error: any) {
			console.log(error.message);
			return thunkAPI.rejectWithValue(error.message || "Error while  running code.");
		}
	}
);

export const submitCode = createAsyncThunk(
	"/editor/submitCode",
	async ({ problemTitle, languageId, code }: DefaultCodeProps, thunkAPI) => {
		try {
			const res = await api.post<CodeExecutionResponse>(
				"/submission/submit-code",
				{
					data: {
						problemTitle,
						languageId,
						code: code,
					},
				}
			);
			return res.data;
		} catch (error: any) {
			console.log(error.message);
			return thunkAPI.rejectWithValue(error.message || "Error while  running code.");
		}
	}
);


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
			const { success, message, data } = action.payload;
			console.log("message of deffault code: ", message);
			if (success && data) {
				const { defaultCode } = data;
				state.code = defaultCode;
			}
		});
		builder.addCase(fetchDefaultCode.rejected, (_, action) => {
			console.log(action.payload);
		});
		builder.addCase(runCode.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(runCode.fulfilled, (state, action) => {
			const { success, data } = action.payload;
			if (success) {
				state.execution_result = data;
				state.loading = false;
			}
		});
		builder.addCase(runCode.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
		builder.addCase(submitCode.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(submitCode.fulfilled, (state, action) => {
			const { success, data } = action.payload;
			if (success) {
				state.execution_result = data;
				state.loading = false;
				console.log("submit code api response: ", data );
			}
		});
		builder.addCase(submitCode.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export default codeEditorSlice.reducer;
export const { setLanguage, toggleFullScreen, setCode } = codeEditorSlice.actions;
