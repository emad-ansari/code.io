import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState, Problem } from "../types";

export const filterInitialState: FilterState= {
    filteredProblems: [],
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState: filterInitialState,
    reducers: {
        // filterProblems: (
		// 	state,
		// 	action: PayloadAction<{ filterType: string; filterQuery: string }>
		// ) => {
		// 	const { filterType, filterQuery } = action.payload;
		// 	let filteredProblems: Problem[] = [];

		// 	if (filterType === "difficulty") {
		// 		filteredProblems = problems.filter(
		// 			(problem) => problem.difficultyLevel === filterQuery
		// 		);
		// 	}

		// 	if (filterType === "status") {
		// 		filteredProblems = problems.filter(
		// 			(problem) => problem.problemStatus === filterQuery
		// 		);
		// 	}
		// 	// state.problemSet = filteredProblems;
        //     // setProblemSet({problems: filterProblems, nextPaginationNumber: })
		// },

    }
})

export default filterSlice.reducer;