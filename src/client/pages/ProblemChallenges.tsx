
import { ChallengesCard } from "../components/common/ChallengesCard";
import math_puzzle from "@/assets/math-and-puzzle.png";

export interface ChallengesCardSchema {
	id: number;
	imgUrl: string;
	type: string;
	title: string;
	tags: string[];
	solvedChallenges: number;
	totalChallenges: number;
}

const challengesCard: ChallengesCardSchema[] = [
	{
		id: 101,
		imgUrl: math_puzzle,
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
		id: 102,
		imgUrl: math_puzzle,
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
		id: 103,
		imgUrl: math_puzzle,
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
		imgUrl: math_puzzle,
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
		id: 105,
		imgUrl: math_puzzle,
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
		id: 106,
		imgUrl: math_puzzle,
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
		id: 107,
		imgUrl: math_puzzle,
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
		id: 108,
		imgUrl: math_puzzle,
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
		id: 109,
		imgUrl: math_puzzle,
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
		imgUrl: math_puzzle,
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
export const ProblemChallenges = () => {
	
	return (
		<main className="bg-code-bg pt-16 text-white h-screen flex justify-center ">
			<div className="flex flex-col w-[60%] pt-12 overflow-y-scroll">
				<h1 className="text-4xl font-bold mb-8">
					Coding <span className="text-code-orange">Challenges</span>
				</h1>
				<div className="flex flex-col gap-5 py-2">
					{challengesCard.map((c) => {
						return (
							<ChallengesCard
								id={c.id}
								title={c.title}
								type={c.type}
								imgUrl={c.imgUrl}
								tags={c.tags}
								solvedChallenges={c.solvedChallenges}
								totalChallenges={c.totalChallenges}
							/>
						);
					})}
				</div>
			</div>
		</main>
	);
};
