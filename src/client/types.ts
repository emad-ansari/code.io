

export interface ProblemState {
	problems: Array<Problem>;
	pageSize: number;
	numberOfPages: number;
	error: any
}
export interface SettingState {
	isOpen: boolean;
	// theme: string,
	// fontSize: string;
}
export interface DropDownType {
	selectedLanguage: string;
	seletedTheme: string;
	isStatusMenuOpen: boolean;
	isDifficultyMenuOpen: boolean;
	isLanguageMenuOpen: boolean
	isThemeMenuOpen: boolean;
	isFullScreen: boolean;
}

export interface Problem { 
	problemId: number;
	problemTitle: string;
	problemDescription: string;
	difficultyLevel: string;
	problemStatus: string;
	problemNo: number
}



export interface ApiResponse<T> {
	data: T,
	totalPages: number;
	message: string;
}

export interface FilterState {
	easy: boolean;
	medium: boolean;
	hard: boolean;
}

export interface getProblemParameter {
	pageNumber: number;
	difficultyLevel: string
}
export interface DropDownItemProps {
	value: string;
	isFilterApply: boolean;
	filterProblems: (difficultyLevel: string) => void;
}

export interface CustomMuiMenuProps {
	labelValue: string;
	

}