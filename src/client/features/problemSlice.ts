import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProblemState, DropDownType } from "../types";


export const problemSliceInitialState : ProblemState  = {
    openDropDownMenu:  {
        isDifficultyMenuOpen: false,
        isStatusMenuOpen: false,
    },
    error: null
}

export const problemSlice = createSlice({
    name: 'problem',
    initialState: problemSliceInitialState,
    reducers: {
        setOpenDropDownMenu: (state, action: PayloadAction<DropDownType> ) => {
            state.openDropDownMenu = action.payload;
        },

    }
});


export default problemSlice.reducer;
export const { setOpenDropDownMenu } = problemSlice.actions;

