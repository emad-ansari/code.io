import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProblemState, DropDownType } from "../types";

export const problemSliceInitialState: ProblemState = {
  openDropDownMenu: {
    isDifficultyMenuOpen: false,
    isStatusMenuOpen: false,
    isLanguageMenuOpen: false,
  },
  selectedLanguage: "Java",
  error: null,
};

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
  },
});

export default problemSlice.reducer;
export const { setOpenDropDownMenu, setSelectedLanguage } = problemSlice.actions;
