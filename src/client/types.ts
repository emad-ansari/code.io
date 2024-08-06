

export interface ProblemState {
	problems: Array<Problem>;
	selectedLanguage: string;
	pageSize: number;
	numberOfPages: number;
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

export interface ApiResponse<T> {
	data: T,
	message: string;
}

export interface FilterState {
	filteredProblems: Problem[];
}


