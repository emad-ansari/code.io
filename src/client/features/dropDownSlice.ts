import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DropDownType } from "../lib/types";

export const dropDownState: DropDownType = {
	isDifficultyMenuOpen: false,
	isStatusMenuOpen: false,
};

export const dropDownSlice = createSlice({
	name: "dropdown",
	initialState: dropDownState,
	reducers: {
		setOpenDropDownMenu: (
			state,
			action: PayloadAction<{ menu: string }>
		) => {
			const { menu } = action.payload;
			const { isDifficultyMenuOpen, isStatusMenuOpen } = state;
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

			return updatedValue;
		},
	},
});

export default dropDownSlice.reducer;
export const { setOpenDropDownMenu } = dropDownSlice.actions;
