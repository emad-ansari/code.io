import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DropDownType } from "../types";


export const dropDownInitialState: DropDownType = {
	selectedLanguage: 'javascript',
	seletedTheme: 'default',
	isDifficultyMenuOpen: false,
	isStatusMenuOpen: false,
	isLanguageMenuOpen: false,
	isThemeMenuOpen: false,
	isFullScreen :false
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
				isThemeMenuOpen
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
			if (menu == "theme") {
				updatedValue = {
					...state,
					isThemeMenuOpen: !isThemeMenuOpen,
				};
			}
			return updatedValue;
		},
		setSelectedItem: (state, action: PayloadAction<{dropDownType: string, selectedItem: string}>) => {
			const { dropDownType, selectedItem } = action.payload;
			if (dropDownType === 'languages') {
				state.selectedLanguage = selectedItem;
			}
			if (dropDownType == 'theme') {
				state.seletedTheme = selectedItem
			}
		},
		toggleFullScreen: (state, action: PayloadAction<boolean>) => {
			state.isFullScreen = action.payload;
		}

	},
});

export default dropDownSlice.reducer;
export const { setOpenDropDownMenu, setSelectedItem, toggleFullScreen } = dropDownSlice.actions;
