import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProblemState, Problem, ApiResponse, getProblemParameter } from "../types";
import { client } from "../api/client";
import { RootState } from "../app/store";



export const problemSliceInitialState: ProblemState = {
	problems: [],
	selectedLanguage: "javascript",
	pageSize: 10,
	numberOfPages: 1,
	error: null,
};

export const getProblems = createAsyncThunk('/problem/getProblems', async({pageNumber, difficultyLevel}: getProblemParameter, ThunkAPI) => {
	const store = ThunkAPI.getState() as RootState;
	const { pageSize } = store.problem;

	try {
		const res = await client.get<ApiResponse<Problem[]>>(`/problem`, {
			params: {
				page: pageNumber,
				pageSize: pageSize,
				difficultyLevel
			}
		});
		const data  = res.data;

		return data;
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
		setPageSize: (state, action: PayloadAction<number>) => {
			state.pageSize = action.payload;
		},
		
		
	},
	extraReducers: (builder) => {
		builder.addCase(getProblems.pending, (_, action) => {
			console.log(action.payload);
			console.log('pending...');

		}) 
		builder.addCase(getProblems.fulfilled, (state, action) => {
			console.log('fulfilled');
			console.log('fulfilled actioon paylaod: ', action.payload);
			const { message, data, totalPages} = action.payload;
			state.problems = data;
			state.numberOfPages = totalPages;
			console.log(state.problems);
			
		}) 
		builder.addCase(getProblems.rejected, (_, action) => {
			console.log(action.payload);
			console.log('rejected');
		}) 
		
	}
});

export default problemSlice.reducer;
export const {
	setSelectedLanguage,
	setPageSize,
} = problemSlice.actions;
