export interface ProblemState {
	openDropDownMenu: DropDownType;
	selectedLanguage: string;
	error: any
}
export interface DropDownType {
	isStatusMenuOpen: boolean;
	isDifficultyMenuOpen: boolean;
	isLanguageMenuOpen: boolean
}


