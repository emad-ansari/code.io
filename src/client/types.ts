

export interface ProblemState {
	problems: Array<Problem>;
	selectedLanguage: string;
	code: string | undefined;
	pageSize: number;
	pagination : {
		currentPagination: number;
		paginationCount: number;
	}
	error: any
}

export interface DropDownType {
	isStatusMenuOpen: boolean;
	isDifficultyMenuOpen: boolean;
	isLanguageMenuOpen: boolean
}

export interface Problem { 
	problemId: number;
	problemTitle: string;
	problemDescription: string;
	difficultyLevel: string;
	problemStatus: string;
}


export interface ProblemFilter {
	openDropDownMenu: DropDownType;
}

export interface FilterState {
	filteredProblems: Problem[];
}

export interface ThunkApiConfig {
	rejectValue: string;
}