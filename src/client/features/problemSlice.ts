import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProblemState, DropDownType, MAX_PROBLEM_LIMIT } from "../types";
import { problems } from "../pages/problems";


export const problemSliceInitialState: ProblemState = {
  problems: [],
  problemSet: [],
  openDropDownMenu: {
    isDifficultyMenuOpen: false,
    isStatusMenuOpen: false,
    isLanguageMenuOpen: false,
  },
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
    setOpenDropDownMenu: (state, action: PayloadAction<{ menu: string }>) => {
      const { menu } = action.payload;
      if (menu === "difficulty") {
        const updatedValue: DropDownType = {
          ...state.openDropDownMenu,
          isDifficultyMenuOpen: !state.openDropDownMenu.isDifficultyMenuOpen,
        };
        console.log("updated value: ", updatedValue);
        state.openDropDownMenu = updatedValue;
        // dispatch(setOpenDropDownMenu(updatedValue));
      }
      if (menu == "status") {
        const updatedValue: DropDownType = {
          ...state.openDropDownMenu,
          isStatusMenuOpen: !state.openDropDownMenu.isStatusMenuOpen,
        };
        // dispatch(setOpenDropDownMenu(updatedValue));
        state.openDropDownMenu = updatedValue;
      }
      if (menu == "languages") {
        const updatedValue: DropDownType = {
          ...state.openDropDownMenu,
          isLanguageMenuOpen: !state.openDropDownMenu.isLanguageMenuOpen,
        };
        // dispatch(setOpenDropDownMenu(updatedValue));
        state.openDropDownMenu = updatedValue;
      }
    },

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
      const startIndex = (nextPagination - 1) * MAX_PROBLEM_LIMIT ;
      // [Todo-Future]- change the below problem.slice with state.problem.slice
      const endIndex = Math.min(nextPagination * MAX_PROBLEM_LIMIT, problems.length );
      // [Todo-Future]- change the below problem.slice with state.problem.slice
      const newProblemSet = problems.slice(startIndex, endIndex);
      state.problemSet = newProblemSet;
    },
  },
});

export default problemSlice.reducer;
export const {
  setOpenDropDownMenu,
  setSelectedLanguage,
  setCode,
  setPaginationCount,
  setProblemSet,
} = problemSlice.actions;
