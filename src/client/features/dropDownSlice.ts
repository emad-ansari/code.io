import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProblemFilter, DropDownType } from "../types";

export const problemFilterInitialState: ProblemFilter = {
	openDropDownMenu: {
		isDifficultyMenuOpen: false,
		isStatusMenuOpen: false,
		isLanguageMenuOpen: false,
	},
};

export const dropDownSlice = createSlice({
	name: "dropdown",
	initialState: problemFilterInitialState,
	reducers: {
		setOpenDropDownMenu: (
			state,
			action: PayloadAction<{ menu: string }>
		) => {
			const { menu } = action.payload;
			const { isDifficultyMenuOpen, isStatusMenuOpen, isLanguageMenuOpen } =	state.openDropDownMenu;
			if (menu === "difficulty") {
				const updatedValue: DropDownType = {
					...state.openDropDownMenu,
					isStatusMenuOpen: isStatusMenuOpen && !isStatusMenuOpen,
					isDifficultyMenuOpen: !isDifficultyMenuOpen,
				};
				state.openDropDownMenu = updatedValue;
			}
			if (menu == "status") {
				const updatedValue: DropDownType = {
					...state.openDropDownMenu,
					isDifficultyMenuOpen:
						isDifficultyMenuOpen && !isDifficultyMenuOpen,
					isStatusMenuOpen: !isStatusMenuOpen,
				};
				state.openDropDownMenu = updatedValue;
			}
			if (menu == "languages") {
				const updatedValue: DropDownType = {
					...state.openDropDownMenu,
					isLanguageMenuOpen: !isLanguageMenuOpen,
				};
				state.openDropDownMenu = updatedValue;
			}
		},

		
	},
});

export default dropDownSlice.reducer;
export const { setOpenDropDownMenu } = dropDownSlice.actions;
