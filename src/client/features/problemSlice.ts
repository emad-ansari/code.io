import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProblemState, MAX_PROBLEM_LIMIT, Problem } from "../types";
import { problems } from "../pages/problems";

export const problemSliceInitialState: ProblemState = {
	problems: [],
	problemSet: [],
	code: ``,
	selectedLanguage: "javascript",
	pagination: {
		currentPagination: 1,
		paginationCount: 1,
	},
	error: null,
};

// export const getProblemList = createAsyncThunk('/problem/getProblemList', async(_, ThunkAPI) => {
//   try{
//     // at the end you will get some problem list over here
//     // so first of all calculate the number of pagination count based on number of problem list by dividing the problems list with MAX_PROBLEM_LIMIT
//     const paginationCount = problems.length / MAX_PROBLEM_LIMIT;
//     ThunkAPI.dispatch(setPaginationCount(paginationCount))
//     // filter the MAX_PROBLEM  from problem list and setProblems(filterProblem);

//     // and you will do setProblems(problemList);

//   }
//   catch(error: any){

//   }
// })

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
		setProblemSet: (state, action: PayloadAction<number>) => {
			const nextPagination = action.payload;
			const startIndex = (nextPagination - 1) * MAX_PROBLEM_LIMIT;
			// [Todo-Future]- change the below problem.slice with state.problem.slice
			const endIndex = Math.min(
				nextPagination * MAX_PROBLEM_LIMIT,
				problems.length
			);
			// [Todo-Future]- change the below problem.slice with state.problem.slice
			const newProblemSet = problems.slice(startIndex, endIndex);
			state.problemSet = newProblemSet;
		},
		filterProblems: (
			state,
			action: PayloadAction<{ filterType: string; filterQuery: string }>
		) => {
			const { filterType, filterQuery } = action.payload;
			let filteredProblems: Problem[] = [];

			if (filterType === "difficulty") {
				filteredProblems = problems.filter(
					(problem) => problem.difficultyLevel === filterQuery
				);
			}

			if (filterType === "status") {
				filteredProblems = problems.filter(
					(problem) => problem.problemStatus === filterQuery
				);
			}
			state.problemSet = filteredProblems;
		},
	},
});

export default problemSlice.reducer;
export const {
	setSelectedLanguage,
	setCode,
	setPaginationCount,
	setProblemSet,
	filterProblems,
} = problemSlice.actions;
