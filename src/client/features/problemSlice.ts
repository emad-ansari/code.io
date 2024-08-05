import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProblemState, Problem, ThunkApiConfig } from "../types";
import { RootState } from "../app/store";




export const problemSliceInitialState: ProblemState = {
	problems: [],
	code: ``,
	selectedLanguage: "javascript",
	pageSize: 10,
	pagination: {
		currentPagination: 1,
		paginationCount: 1,
	},
	error: null,
};

export const getProblems = createAsyncThunk<Problem[], { pageNumber: number }, ThunkApiConfig>('/problem/getProblems', async(pageNumber: number, ThunkAPI) => {
	const store = ThunkAPI.getState() as RootState;
	try {

	}
	catch(error: any){
		return ThunkAPI.rejectWithValue(error.message || "failed to fetch problems");
	}

})

export const problemSlice = createSlice({
	name: "problem",
	initialState: problemSliceInitialState,
	reducers: {
		setSelectedLanguage: (state, action: PayloadAction<string>) => {
			state.selectedLanguage = action.payload;
		},
		setCode: (state, action: PayloadAction<string | undefined>) => {
			state.code = action.payload;
		},
		setPaginationCount: (
			state,
			action: PayloadAction<{	
				currentPagination: number;
				paginationCount: number;
			}>
		) => {
			state.pagination = action.payload;
		},
		setPageSize: (state, action: PayloadAction<number>) => {
			state.pageSize = action.payload;
		},
		
	},
	extraReducers: (builder) => {
		builder.addCase(getProblems.pending, (_state, _action) => {

		}) 
		builder.addCase(getProblems.fulfilled, (_state, _action) => {
			
		}) 
		builder.addCase(getProblems.rejected, (_state, _action) => {
			
		}) 
	}
});

export default problemSlice.reducer;
export const {
	setSelectedLanguage,
	setCode,
	setPaginationCount,
	setPageSize
} = problemSlice.actions;


	// const  nextPaginationNumber = action.payload;
			// const startIndex = (nextPaginationNumber - 1) * MAX_PROBLEM_LIMIT;
			// // [Todo-Future]- change the below problem.slice with state.problem.slice
			// const endIndex = Math.min(
			// 	nextPaginationNumber * MAX_PROBLEM_LIMIT,
			// 	problems.length
			// );
			// // [Todo-Future]- change the below problem.slice with state.problem.slice
			// const newProblemSet = problems.slice(startIndex, endIndex);
			// state.problemSet = newProblemSet;