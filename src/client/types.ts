export let MAX_PROBLEM_LIMIT = 10;

export interface ProblemState {
	problems: Array<Problem>;
	problemSet: Array<Problem>;
	selectedLanguage: string;
	code: string | undefined;
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

