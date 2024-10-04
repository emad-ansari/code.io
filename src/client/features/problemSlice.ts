import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
	ProblemState,
	ApiResponse,
	getProblemParameter,
	ProblemDetailApiResponse,
	Problem
} from "../types";
import { api } from "../api/client";
import { RootState } from "../app/store";

export const problemSliceInitialState: ProblemState = {
	problems: [],
	pageSize: 2,
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

export const getProblems = createAsyncThunk(
	"/problem/getProblems",
	async (
		{ pageNumber, difficulty, status }: getProblemParameter,
		ThunkAPI
	) => {
		const store = ThunkAPI.getState() as RootState;
		const { pageSize } = store.problem;

		try {
			const res = await api.get<ApiResponse<Problem[]>>(
				`/problem/filter-problem`,
				{
					params: {
						pageNumber,
						pageSize,
						difficulty,
						status,
					},
				}
			);
			const data = res.data;
			console.log("filter problem: ", data);

			return data;
		} catch (error: any) {
			return ThunkAPI.rejectWithValue(
				error.message || "failed to fetch problems"
			);
		}
	}
);

export const fetchProblemDetail = createAsyncThunk<
	ProblemDetailApiResponse,
	{ title: string }
>(
	"/problem/fetchProblemDetai",
	async ({ title }: { title: string }) => {
		if (!title) {
			return;
		}
		try {
			const res = await api.get(
				`/problem/get-problem-details/${title}`
			);
			const data = res.data;
			console.log("problem details data: ", data);
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
	},
	extraReducers: (builder) => {
		builder.addCase(getProblems.pending, (_, action) => {
			console.log(action.payload);
		});
		builder.addCase(getProblems.fulfilled, (state, action) => {
			const { success } = action.payload;
			if (success) {
				const { data, totalPages } = action.payload;
				state.problems = data;
				state.totalPages = totalPages;
			}
		});
		builder.addCase(getProblems.rejected, (_, action) => {
			console.log(action.payload);
		});
		builder.addCase(fetchProblemDetail.pending, (state, action) => {
			state.loading = true;
			console.log(action.payload);
		});
		builder.addCase(fetchProblemDetail.fulfilled, (state, action) => {
			const { success, message } = action.payload;
			const problemDetails = action.payload.problemDetails;
			if (success && problemDetails) {
				state.problemDetail = problemDetails;
				state.loading = false;
			}
			console.log(" problem details api response message", message);
		});
		builder.addCase(fetchProblemDetail.rejected, (state, action) => {
			state.loading = false;
			console.log(action.payload);
		});
	},
});

export default problemSlice.reducer;
export const { setPageSize } = problemSlice.actions;
