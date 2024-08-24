import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DropDownType } from "../types";


export const dropDownInitialState: DropDownType = {
	isDifficultyMenuOpen: false,
	isStatusMenuOpen: false,
	isLanguageMenuOpen: false,
	isThemeMenuOpen: false,
};

export const dropDownSlice = createSlice({
	name: "dropdown",
	initialState: dropDownInitialState,
	reducers: {
		setOpenDropDownMenu: (
			state,
			action: PayloadAction<{ menu: string }>
		) => {
			const { menu } = action.payload;
			const {
				isDifficultyMenuOpen,
				isStatusMenuOpen,
				isLanguageMenuOpen,
			} = state;
			let updatedValue: DropDownType = { ...state };

			if (menu === "difficulty") {
				updatedValue = {
					...state,
					isStatusMenuOpen: isStatusMenuOpen && !isStatusMenuOpen,
					isDifficultyMenuOpen: !isDifficultyMenuOpen,
				};
			}
			if (menu == "status") {
				updatedValue = {
					...state,
					isDifficultyMenuOpen:
						isDifficultyMenuOpen && !isDifficultyMenuOpen,
					isStatusMenuOpen: !isStatusMenuOpen,
				};
				
			}
			if (menu == "languages") {
				updatedValue = {
					...state,
					isLanguageMenuOpen: !isLanguageMenuOpen,
				};
				
			}

			return updatedValue;
		},
		
		

	},
});

export default dropDownSlice.reducer;
export const { setOpenDropDownMenu } = dropDownSlice.actions;
