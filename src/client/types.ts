export interface ProblemState {
	problems: Problem[];
	pageSize: number;
	totalPages: number;
	problemDetail: ProblemDetail;
	error: any;
	loading: boolean
}
export interface SettingState {
	isOpen: boolean;
	theme: string;
	fontSize: number;
	isFullScreen: boolean;
}
export interface DropDownType {
	isStatusMenuOpen: boolean;
	isDifficultyMenuOpen: boolean;
	isLanguageMenuOpen: boolean;
	isThemeMenuOpen: boolean;
}

export interface EditorState {
	language: string;
	isFullScreen: boolean;
	boilerPlateCode: string;
	code: string;
	execution_result: ExecutionResult;
	loading: boolean;
	error: string | null | undefined;
}

export interface Problem {
	id: string;
	title: string;
	difficulty: string;
	problemNo: number;
	problemStatus?: {
		status: string
	}
}
export interface ProblemDetail extends Problem {
	description: string;
	testcaseExamples: TestCaseExample[];
}
export interface TestCaseExample {
	title: string;
	inputs: Input[];
	output: Output | null;
}
export interface Input {
	type: string;
	name: string;
	value: string;
}
export interface Output {
	value: string;
	type: string;
}

export interface ApiResponse<T> {
	success: boolean;
	data: T;
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
	difficulty: string;
	status: string;
	searchKeywords: string
}
export interface DropDownItemProps {
	value: string;
	isFilterApply: boolean;
	filterProblems: (difficultyLevel: string) => void;
}

export interface CustomMuiMenuProps {
	labelName: string;
	labelValue: string;
	ITEMS_ARRAY: string[];
}

// export interface SubmissionResult {
// 	status: string;
// 	testCasesPassed: number;
// 	userOutput?: string | "";
// 	expectedOutput?: string;
// 	compilationError?: string | "";
// 	failedTestCase?: string | "";
// }

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
	testcaseExamples?: TestCaseExample[],
	inputs: Input[]
}
export type UserApiResponse = {
	success: boolean;
	message: string;
	token?: string;
}

export type ProblemDetailApiResponse = {
	success: boolean;
	message: string;
	problemDetails?: ProblemDetail
}


export interface RefreshTokenApiResponse {
	success: boolean,
	message: string;
	accessToken?: string
}
export interface DefaultCodeApiResponse {
	success: boolean;
	message: string;
	defaultCode?: string
}

export const problems_per_page = ["10 / page", "20 / page", "50 / page"]