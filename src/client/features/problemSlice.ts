import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
	ProblemState,
	ApiResponse,
	FetchProblemProps,
	Problem,
	APIResponse,
	ProblemDetail
} from "../types";
import { api } from "../api/client";
import { RootState } from "../app/store";

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
	error: null,
	loading: false,
};

export const fetchProblem = createAsyncThunk(
	"/problem/getProblems",
	async (
		{ pageNumber, difficulty, status, searchKeywords }: FetchProblemProps,
		ThunkAPI
	) => {
		const store = ThunkAPI.getState() as RootState;
		const { pageSize } = store.problem;		
		try {
			const res = await api.get<ApiResponse<Problem[]>>(
				`/problem/filter-problem`,
				{
					params: {
						pageNumber: pageNumber < 1 ? 1: pageNumber,
						pageSize,
						difficulty,
						status,
						searchKeywords
					},
				}
			);
			const data = res.data;

			return data;
		} catch (error: any) {
			return ThunkAPI.rejectWithValue(
				error.message || "failed to fetch problems"
			);
		}
	}
);

export const fetchProblemDetail = createAsyncThunk<APIResponse<ProblemDetail>,{ title: string }>("/problem/fetchProblemDetail",
	async ({ title }: { title: string }) => {
		if (!title) {
			return;
		}
		try {
			const res = await api.get(
				`/problem/get-problem-details/${title}`
			);
			const data = res.data;
			return data;
		} catch (error: any) {
			console.log(error);
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
		setProblems: (state, action: PayloadAction<{problems: Problem[]}>) => {
			const { problems } = action.payload;
			state.problems = problems;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProblem.pending, (_, action) => {
			console.log(action.payload);
		});
		builder.addCase(fetchProblem.fulfilled, (state, action) => {
			const { success } = action.payload;
			if (success) {
				const { data, totalPages } = action.payload;
				state.problems = data;
				state.totalPages = totalPages;
			}
		});
		builder.addCase(fetchProblem.rejected, (_, action) => {
			console.log(action.payload);
		});
		builder.addCase(fetchProblemDetail.pending, (state, _) => {
			state.loading = true;
			// console.log(action.payload);
		});
		builder.addCase(fetchProblemDetail.fulfilled, (state, action) => {
			const { success, data } = action.payload;
			if (success  && data) {
				state.problemDetail = data;
				state.loading = false;
			}
		});
		builder.addCase(fetchProblemDetail.rejected, (state, action) => {
			state.loading = false;
			console.log(action.payload);
		});
	},
});

export default problemSlice.reducer;
export const { setPageSize, setProblems } = problemSlice.actions;
