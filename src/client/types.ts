export interface ProblemState {
	openDropDownMenu: DropDownType;
	selectedLanguage: string;
	code: string;
	error: any
}
export interface DropDownType {
	isStatusMenuOpen: boolean;
	isDifficultyMenuOpen: boolean;
	isLanguageMenuOpen: boolean
}


