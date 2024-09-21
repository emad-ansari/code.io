import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
	ProblemState,
	ApiResponse,
	getProblemParameter,
	ServerProblem,
} from "../types";
import { client } from "../api/client";
import { RootState } from "../app/store";

export const problemSliceInitialState: ProblemState = {
	problems: [],
	pageSize: 10,
	numberOfPages: 1,
	error: null,
	problemDetail: {
		status: "",
		problem: {
			id: "",
			title: "",
			description: "",
			difficulty: "",
			problemNo: 0,
		},
		testcaseExamples: [
			{
				id: "",
				inputs: [{ name: "", value: "" }],
				output: {
					value: "",
				},
			},
		],
	},
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
			const res = await client.get<ApiResponse<ServerProblem[]>>(
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

			return data;
		} catch (error: any) {
			return ThunkAPI.rejectWithValue(
				error.message || "failed to fetch problems"
			);
		}
	}
);

export const getSpecificProblemDetails = createAsyncThunk(
	"/problem/getSpecificProblemDetails",
	async (problemId: string) => {
		if (!problemId) {
			alert("problem id is null");
			return;
		}
		try {
			console.log("problem id is before request:  ", problemId);
			const res = await client.get(
				`/problem/get-problem-details/${problemId}`
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
	},
	extraReducers: (builder) => {
		builder.addCase(getProblems.pending, (_, action) => {
			console.log(action.payload);
		});
		builder.addCase(getProblems.fulfilled, (state, action) => {
			const { message, data, totalPages } = action.payload;
			state.problems = data;
			state.numberOfPages = totalPages;
		});
		builder.addCase(getProblems.rejected, (_, action) => {
			console.log(action.payload);
		});
		builder.addCase(getSpecificProblemDetails.pending, (_, action) => {
			console.log(action.payload);
		});
		builder.addCase(
			getSpecificProblemDetails.fulfilled,
			(state, action) => {
				const { message } = action.payload;
				if (message === "success") {
					state.problemDetail = action.payload.problemDetails;
				}
			}
		);
		builder.addCase(getSpecificProblemDetails.rejected, (_, action) => {
			console.log(action.payload);
		});
	},
});

export default problemSlice.reducer;
export const { setPageSize } = problemSlice.actions;
