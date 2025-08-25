import { parseISO, format } from "date-fns";

export interface ProblemCategory {
	id: string;
	name: string;
	title: string;
	tags: string[];
	imgUrl: string;
	totalProblems: number;
	solvedProblems: number;
}

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
	dislikes: number;
	userSubmissions: UserSubmission[];
}

export interface ProblemDetail {
	id: string | undefined;
	problemNo: number | undefined;
	title: string | undefined;
	description: string | undefined;
	difficulty: string | undefined;
	likes: number | undefined;
	tags: string[] | undefined;
	status: string | null;
}

export interface UserSubmission {
	id: string;
	language: string;
	code: string;
	time: string;
	memory: string;
	status: string;
	createdAt: Date;
}

export interface SettingState {
	theme: string;
	fontSize: number;
}
export interface DropDownType {
	isStatusMenuOpen: boolean;
	isDifficultyMenuOpen: boolean;
}

export interface DefaultCodeProps {
	problemId: string;
	language: string;
	code?: string;
}
export interface FilterState {
	easy: boolean;
	medium: boolean;
	hard: boolean;
}

export interface FetchProblemProps {
	categoryName: string;
	pageNumber: number;
	difficulty: string;
	status: string;
	searchKeywords: string;
}

export interface EditorState {
	loading: boolean;
	error: string | null | undefined;
	isFullScreen: boolean;
	language: string;
	code: string;
	submission_result: CodeExecutionResult;
}

export interface CodeExecutionResult {
	passed_testcases: number;
	submissions: SubmissionDetails[];
}

export interface SubmissionDetails {
	input: string; // stdin
	user_output: string; // stdout
	expected_output: string; // expected output
	status: SubmissionStatus;
	compile_output?: string | null;
}

export interface CodeExecutionProps {
	language: string;
	problemId: string;
	code: string;
}

export interface APIResponse<T> {
	success: boolean;
	data?: T;
	msg: string | null;
}
export interface UserDetail {
	id: string;
	username: string;
	imgUrl?: string;
	token?: string
}
export const EDITOR_THEMES: string[] = [
	"vs-dark",
	"vs",
	"hc-light",
	"OneDarkPro",
];

export const FONT_SIZES: string[] = ["14px", "16px", "18px", "20px", "22px"];

export const LANGUAGES = ["java", "cpp", "python"];

export const problems_per_page = ["10 / page", "20 / page", "50 / page"];

export const DIFFICULTY = ["Easy", "Medium", "Hard"];

export const STATUS = ["Todo", "Solved", "Attempted"];

export type SubmissionStatus =
	| "Accepted"
	| "Wrong Answer"
	| "Compilation Error"
	| "Time Limit Exceeded"
	| "Memory Limit Exceeded"
	| "Run Time Error";

export const successClassname =
	"max-w-full  flex gap-3 px-2 py-1 items-center bg-green-800/10 text-green-500 rounded-lg border border-green-500/10 cursor-pointer";

export const errorClassname =
	"max-w-full flex gap-3 px-2 py-1 items-center bg-red-800/10 text-red-500 rounded-lg border border-red-500/10 cursor-pointer";

export const formatDate = (date: string) => {
	const dateObj = parseISO(date);

	// Format Date to something readable
	return format(dateObj, "dd MMMM yyyy");
};


