import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProblemFilter, DropDownType } from "../types";

export const problemFilterInitialState: ProblemFilter = {
    openDropDownMenu: {
        isDifficultyMenuOpen: false,
        isStatusMenuOpen: false,
        isLanguageMenuOpen: false,
    },
}

export const problemFilterSlice = createSlice({
    name: 'filter',
    initialState: problemFilterInitialState,
    reducers: {
        setOpenDropDownMenu: (state, action: PayloadAction<{ menu: string }>) => {
            const { menu } = action.payload;
            const { isDifficultyMenuOpen, isStatusMenuOpen } = state.openDropDownMenu;
      
            if (menu === "difficulty") {
              const updatedValue: DropDownType = {
                ...state.openDropDownMenu,
                isStatusMenuOpen: isStatusMenuOpen && !isStatusMenuOpen,
                isDifficultyMenuOpen: !state.openDropDownMenu.isDifficultyMenuOpen,
              };
              state.openDropDownMenu = updatedValue;
            }
            if (menu == "status") {
              const updatedValue: DropDownType = {
                ...state.openDropDownMenu,
                isDifficultyMenuOpen: isDifficultyMenuOpen && !isDifficultyMenuOpen,
                isStatusMenuOpen: !state.openDropDownMenu.isStatusMenuOpen,
              };
              state.openDropDownMenu = updatedValue;
            }
            if (menu == "languages") {
              const updatedValue: DropDownType = {
                ...state.openDropDownMenu,
                isLanguageMenuOpen: !state.openDropDownMenu.isLanguageMenuOpen,
              };
              state.openDropDownMenu = updatedValue;
            }
        },

    }
})



export default problemFilterSlice.reducer;
export const { setOpenDropDownMenu } = problemFilterSlice.actions;

