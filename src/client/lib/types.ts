export interface ProblemState {
	problems: Problem[];
	pageSize: number;
	totalPages: number;
	problemDetail: ProblemDetail;
	error: any;
	loading: boolean;
}
export interface SettingState {
	theme: string;
	fontSize: number;
}
export interface DropDownType {
	isStatusMenuOpen: boolean;
	isDifficultyMenuOpen: boolean;
}

export interface EditorState {
	language: string;
	isFullScreen: boolean;
	code: string;
	execution_result: ExecutionResult;
	loading: boolean;
	error: string | null | undefined;
}
export interface DefaultCodeProps {
	problemTitle: string;
	languageId: number;
	code?: string;
}

export interface Problem {
	id: string;
	title: string;
	difficulty: string;
	problemNo: number;
	problemStatus?: {
		status: string;
	};
}
export interface TestCaseInput {
	type: string;
	name: string;
	value: string;
}
export interface TestCaseExample {
	title: string;
	inputs: TestCaseInput[];
	output: TestCaseOutput | null;
}

export interface TestCaseOutput {
	value: string;
	type: string;
}
export interface ProblemDetail extends Problem {
	description: string;
	testcaseExamples: TestCaseExample[];
}

export interface FilterState {
	easy: boolean;
	medium: boolean;
	hard: boolean;
}

export interface FetchProblemProps {
	pageNumber: number;
	difficulty: string;
	status: string;
	searchKeywords: string;
}

export interface DropDownItemProps {
	value: string;
	isFilterApply: boolean;
	filterProblems: (difficultyLevel: string) => void;
}

export interface CustomMuiMenuProps {  // check whether its used or not
	labelName: string;
	labelValue: string;
	ITEMS_ARRAY: string[];
}

export interface CodeExecutionResponse {
	success: boolean;
	data: ExecutionResult;
	message?: string;
}
export interface ExecutionResult {
	overallStatus: string; // Wrong Answer || Compilation Error || Accepted || Time Limit Exceed
	passed_testcases: number;
	submissions: SubmissionDetails[];
}

export interface SubmissionDetails {
	languageId: number;
	stdin: string;
	stdout: string;
	expected_output: string;
	status: {
		id: number;
		description: string;
	};
	compile_output?: string | null;
	testcaseExamples?: TestCaseExample[];
	inputs: TestCaseInput[];
}

export interface APIResponse<T> {
	success: boolean;
	data?: T;	
	message: string | null
}

export const typeOptions: string[] = [
	"void",
	"int",
	"int[]",
	"int[][]",
	"char",
	"char[]",
	"char[][]",
	"String",
	"String[]",
	"String[][]",
	"boolean",
	"boolean[]",
	"boolean[][]",
	"float",
	"float[]",
	"double",
	"double[]",
	"List<Integer>",
	"List<List<Integer>>",
	"List<String>",
	"List<List<String>>",
];
export const LNAGUAGE_MAPPING: {
	[key: string]: { name: string; languageId: number };
} = {
	javascript: { name: "javascript", languageId: 63 },
	cpp: { name: "cpp", languageId: 10 },
	typescript: { name: "typescript", languageId: 74 },
	java: { name: "java", languageId: 62 },
	python: { name: "python", languageId: 71 },
};

export const EDITOR_THEMES: string[] = ["vs-dark", "vs", "hc-light", "OneDarkPro"];
export const FONT_SIZES: string[] = ["12px", "14px", "16px", "18px", "20px", "22px"];
export const LANGUAGES = ["java", "cpp", "typescript", "javascript", "go", "rust"];
export const problems_per_page = ["10 / page", "20 / page", "50 / page"];
