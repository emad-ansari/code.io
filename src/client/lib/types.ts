import math from '@/assets/math-and-puzzle.png'
import dp from '@/assets/dp.png';
import greedy from '@/assets/greedy.png';
import graph from '@/assets/graph.png';
import tree from '@/assets/tree.png';

export interface ProblemState {
	problems: Problem[];
	pageSize: number;
	totalPages: number;
	problemDetail: ProblemDetail;
	userSubmissions: UserSubmission[]
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
	categoryName: string,
	pageNumber: number;
	difficulty: string;
	status: string;
	searchKeywords: string;
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
export interface UserSubmission {
	id: string;
	languageId: number;
	code: string;
	time: string;
	memory: string;
	status: string;
	createdAt: Date
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


export interface ChallengesCardSchema {
	id: number;
	imgUrl: string;
	type: string;
	title: string;
	tags: string[];
	solvedChallenges: number;
	totalChallenges: number;
}

export const challengesCard: ChallengesCardSchema[] = [
	{
		id: 101,
		imgUrl: math,
		type: "math",
		title: "Math & Puzzles",
		tags: [
			"Number Theory",
			"Probability",
			"Combination",
			"Primes & Divisibility",			
		],
		solvedChallenges: 6,
		totalChallenges: 10,
	},
	{
		id: 108,
		imgUrl: "@/assets/math-and-puzzle.png",
		type: "array",
		title: "Array & Techniques",
		tags: [
			"Two Pointers",
			"Sliding Window",
			"Prefix Sum",
			"Binary Search",
			"Sorting",
		],
		solvedChallenges: 8,
		totalChallenges: 14,
	},
	{
		id: 102,
		imgUrl: greedy,
		type: "greedy",
		title: "Greedy Algorithm",
		tags: [
			"Sorting",
			"Interval Scheduling",
			"Activity Selection",
			"Job Sequencing",
		],
		solvedChallenges: 3,
		totalChallenges: 12,
	},
	{
		id: 104,
		imgUrl: "@/assets/math-and-puzzle.png",
		type: "backtracking",
		title: "Backtracking",
		tags: [
			"Sudoku Solver",
			"N-Queens",
			"Subset Generation",
			"Permutations",
			"Maze Solving",
		],
		solvedChallenges: 2,
		totalChallenges: 8,
	},
	{
		id: 103,
		imgUrl: dp,
		type: "dp",
		title: "Dynamic Programming",
		tags: [
			"Knapsack",
			"Longest Subsequence",
			"Partitioning",
			"DP on Strings",
			"Memoization",
		],
		solvedChallenges: 5,
		totalChallenges: 15,
	},
	{
		id: 104,
		imgUrl: "@/assets/math-and-puzzle.png",
		type: "backtracking",
		title: "Backtracking",
		tags: [
			"Sudoku Solver",
			"N-Queens",
			"Subset Generation",
			"Permutations",
			"Maze Solving",
		],
		solvedChallenges: 2,
		totalChallenges: 8,
	},
	{
		id: 106,
		imgUrl: tree,
		type: "tree",
		title: "Tree / Binary Tree / BST",
		tags: [
			"LCA",
			"Tree DP",
			"Tree Traversals",
			"Binary Search Tree",
			"Postorder",
			"Inorder",
		],
		solvedChallenges: 4,
		totalChallenges: 10,
	},
	{
		id: 105,
		imgUrl: graph,
		type: "graph",
		title: "Graph Theory",
		tags: [
			"DFS / BFS",
			"Topological Sort",
			"Dijkstra",
			"Kruskal",
			"Union-Find",
			"Graph Coloring",
		],
		solvedChallenges: 7,
		totalChallenges: 20,
	},
	
	{
		id: 107,
		imgUrl: "@/assets/math-and-puzzle.png",
		type: "string",
		title: "String Problems",
		tags: [
			"KMP",
			"Trie",
			"Palindromes",
			"Pattern Matching",
			"Anagram",
			"String Compression",
		],
		solvedChallenges: 6,
		totalChallenges: 12,
	},
	
	{
		id: 109,
		imgUrl: "@/assets/math-and-puzzle.png",
		type: "bit",
		title: "Bit Manipulation",
		tags: [
			"XOR",
			"Bit Masking",
			"Set Bits",
			"Power of Two",
			"Subset Generation",
		],
		solvedChallenges: 3,
		totalChallenges: 9,
	},
	{
		id: 110,
		imgUrl: "@/assets/math-and-puzzle.png",
		type: "data-structures",
		title: "Data Structures",
		tags: [
			"Stack",
			"Queue",
			"Heap",
			"Hashing",
			"Linked List",
			"Segment Tree",
		],
		solvedChallenges: 5,
		totalChallenges: 13,
	},
];