export interface Testcase {
	id: string;
	input: string;
	expected_output: string;
	isSample: boolean;
}

export interface Template {
	id: string;
	language: string;
	full_template: string;
	boiler_code: string;
}

export interface Problem {
	id: string;
	problemNo: number;
	title: string;
	difficulty: string;
	likes: number;
	submissions: number;
	categoryName: string;
	status: string | null;
}

export interface ProblemState {
	loading: boolean;
	category: string;
	title: string;
	difficulty: string;
	description: string;
	tags: string[];
	testcases: Testcase[];
	templates: Template[];
	totalPages: number;
	pageSize: number;
	problems: Problem[];
	problemDetail: ProblemDetail | null;
	likes: number;
	dislikes: number
	userSubmissions: UserSubmission[]
}


export interface ProblemDetail {
	id: string | undefined;
	problemNo: number | undefined;
	title: string | undefined;
	description: string | undefined;
	difficulty: string | undefined;
	likes: number | undefined;
	tags: string[] | undefined;
	status: string | null
}

export interface UserSubmission {
	id: string;
	languageId: number;
	code: string;
	time: string;
	memory: string;
	status: string;
	createdAt: Date
}

export interface SettingState {
	theme: string;
	fontSize: number;
}
export interface DropDownType {
	isStatusMenuOpen: boolean;
	isDifficultyMenuOpen: boolean;
}

// export interface EditorState {
// 	language: string;
// 	isFullScreen: boolean;
// 	code: string;
// 	execution_result: ExecutionResult;
// 	loading: boolean;
// 	error: string | null | undefined;
// }
export interface DefaultCodeProps {
	problemTitle: string;
	languageId: number;
	code?: string;
}

export interface FilterState {
	easy: boolean;
	medium: boolean;
	hard: boolean;
}

export interface FetchProblemProps {
	categoryName: string,
	pageNumber: number;
	difficulty: string;
	status: string;
	searchKeywords: string;
}

// export interface CodeExecutionResponse {
// 	success: boolean;
// 	data: ExecutionResult;
// 	message?: string;
// }

// export interface ExecutionResult {
// 	overallStatus: string; // Wrong Answer || Compilation Error || Accepted || Time Limit Exceed
// 	passed_testcases: number;
// 	submissions: SubmissionDetails[];
// }

// export interface SubmissionDetails {
// 	languageId: number;
// 	stdin: string;
// 	stdout: string;
// 	expected_output: string;
// 	status: {
// 		id: number;
// 		description: string;
// 	};
// 	compile_output?: string | null;
// 	testcaseExamples?: TestCaseExample[];
// 	inputs: TestCaseInput[];
// }

export interface APIResponse<T> {
	success: boolean;
	data?: T;	
	msg: string | null
}

export interface ProblemCategory {
	id: string;
	name: string;
	title: string;
	tags: string[];
	imgUrl: string;
	totalProblems: number;
	solvedProblems: number
}


export const LNAGUAGE_MAPPING: {
	[key: string]: { name: string; languageId: number };
} = {
	javascript: { name: "javascript", languageId: 63 },
	cpp: { name: "cpp", languageId: 54 },
	typescript: { name: "typescript", languageId: 74 },
	java: { name: "java", languageId: 62 },
	python: { name: "python", languageId: 71 },
};

export const EDITOR_THEMES: string[] = ["vs-dark", "vs", "hc-light", "OneDarkPro"];

export const FONT_SIZES: string[] = ["14px", "16px", "18px", "20px", "22px"];

export const LANGUAGES = ["java", "cpp", "python"];

export const problems_per_page = ["10 / page", "20 / page", "50 / page"];

export const DIFFICULTY = ['Easy', 'Medium', 'Hard'];

export const STATUS =  ["Todo", "Solved", "Attempted"]


// export const formatNumbers = (value: number | undefined) =>  {
// 	return formatSiUnit(value);
// }
