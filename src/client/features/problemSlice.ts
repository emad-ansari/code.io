import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
	ProblemState,
	FetchProblemProps,
	Problem,
	APIResponse,
	ProblemDetail,
	UserSubmission,
} from "@/client/lib/types";
import { api } from "@/client/api/client";
import { RootState } from "@/client/app/store";

export const problemSliceInitialState: ProblemState = {
	problems: [],
	pageSize: 10,
	totalPages: 1,
	problemDetail: {
		id: "",
		title: "",
		description: "",
		difficulty: "",
		problemNo: 0,
		testcaseExamples: [],
	},
	userSubmissions: [], 
	error: null,
	loading: false,
};

export const fetchProblem = createAsyncThunk(
	"/problem/fetchProblem",
	async (
		{ pageNumber, difficulty, status, searchKeywords }: FetchProblemProps,
		ThunkAPI
	) => {
		const store = ThunkAPI.getState() as RootState;
		const { pageSize } = store.problem;
		try {
			const res = await api.get<
				APIResponse<{ problems: Problem[]; totalPages: number }>
			>(`/problem/filter-problem`, {
				params: {
					pageNumber: pageNumber < 1 ? 1 : pageNumber,
					pageSize,
					difficulty,
					status,
					searchKeywords,
				},
			});
			const data = res.data;
			console.log(data);

			return data;
		} catch (error: any) {
			return ThunkAPI.rejectWithValue(
				error.message || "failed to fetch problems"
			);
		}
	}
);

export const fetchProblemDetail = createAsyncThunk<
	APIResponse<ProblemDetail>,
	{ title: string }
>("/problem/fetchProblemDetail", async ({ title }: { title: string }) => {
	if (!title) {
		return;
	}
	try {
		const res = await api.get(`/problem/get-problem-details/${title}`);
		const data = res.data;
		return data;
	} catch (error: any) {
		console.log(error);
	}
});

export const fetchUserSubmissions = createAsyncThunk(
	"/problem/fetchUserSubmissions",
	async (_, thunkAPI) => {
		try {
			const response = await api.get<APIResponse<UserSubmission[]>>("/submission/get-submissions");
			const data = response.data;
			return data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(
				error.message || "Error occurred while fetching default code."
			);
		}
	}
);

export const problemSlice = createSlice({
	name: "problem",
	initialState: problemSliceInitialState,
	reducers: {
		setPageSize: (state, action: PayloadAction<number>) => {
			state.pageSize = action.payload;
		},
		setProblems: (
			state,
			action: PayloadAction<{ problems: Problem[] }>
		) => {
			const { problems } = action.payload;
			state.problems = problems;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProblem.pending, (_, action) => {
			console.log(action.payload);
		});
		builder.addCase(fetchProblem.fulfilled, (state, action) => {
			const { success, data } = action.payload;
			if (success && data) {
				const { problems, totalPages } = data;
				state.problems = problems;
				state.totalPages = totalPages;
			}
		});
		builder.addCase(fetchProblem.rejected, (_, action) => {
			console.log(action.payload);
		});
		builder.addCase(fetchProblemDetail.pending, (state, _) => {
			state.loading = true;
		});
		builder.addCase(fetchProblemDetail.fulfilled, (state, action) => {
			const { success, data } = action.payload;
			if (success && data) {
				state.problemDetail = data;
				state.loading = false;
			}
		});
		builder.addCase(fetchProblemDetail.rejected, (state, action) => {
			state.loading = false;
			console.log(action.payload);
		});
		builder.addCase(fetchUserSubmissions.fulfilled, (state, action) => {
			const { success, data } = action.payload;
			if (success && data !== undefined) {
				state.userSubmissions = data;
			}
			console.log('user submissions api response: ', data);
		});
	},
});

export default problemSlice.reducer;
export const { setPageSize, setProblems } = problemSlice.actions;
