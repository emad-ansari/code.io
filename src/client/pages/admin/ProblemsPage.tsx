import { useNavigate } from "react-router-dom";
import { BarChart, Plus, Star, Ellipsis, Search } from "lucide-react";

import { Button } from "@/client/components/ui/button";
import { CustomPagination } from "@/client/pages/ProblemsetPage";
import { DropDownMenu } from "@/client/components/ui/DropDownMenu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/client/components/ui/table";
import { DIFFICULTY } from "@/client/lib/types";
import { startTransition } from "react";

const problems = [
	{
		id: 1,
		title: "Two sum",
		difficulty: "Easy",
		problemNo: 1,
		problemStatus: {
			status: "Solved",
		},
		likes: 12,
		submissions: 100,
	},
	{
		id: 2,
		title: "Two sum",
		difficulty: "Hard",
		problemNo: 2,
		problemStatus: {
			status: "Solved",
		},
		likes: 12,
		submissions: 100,
	},
	{
		id: 3,
		title: "Two sum",
		difficulty: "Medium",
		problemNo: 3,
		problemStatus: {
			status: "Solved",
		},
		likes: 12,
		submissions: 100,
	},
];

const ProblemsPage = () => {
	const navigate = useNavigate();
	function filterProblems() {
		throw new Error("Function not implemented.");
	}

	return (
		<main>
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-semibold m-0">All Problems</h1>
				<Button
					className="flex gap-2 bg-[#29324a]  border border-transparent hover:border-[#307dd9] box-border "
					onClick={() =>
						startTransition(() => {
							navigate('../new-problem');
						})
					}
				>
					<Plus size={18} />
					<span>Add New Problem</span>
				</Button>
			</div>
			<div className="mt-8 flex items-center justify-between ">
				<div className="relative flex-1 text-white shadow-inner">
					<Search
						strokeWidth={1.25}
						className="absolute top-1/4 left-3 w-5 h-5"
					/>
					<input
						type="text"
						className="bg-code-bg rounded-md outline-none px-10 py-2.5 text-sm w-full placeholder-[#484848] focus:ring ring-slate-800 border border-[#334155] "
						placeholder="Search Problems"
					/>
				</div>
				<div className="flex flex-1 items-center justify-end">
					<DropDownMenu
						className="bg-code-bg w-32 h-10 text-md  border border-code-border"
						placeholder="Difficulty"
						items={DIFFICULTY}
						onValueChange={filterProblems}
					/>
				</div>
			</div>
			<div className="mt-8">
				<Table className=" overflow-hidden rounded-lg bg-[#29324a] border border-code-border">
					<TableHeader className="bg-gray-800">
						<TableRow className="border-b border-code-border  hover:bg-gray-750 ">
							<TableHead className="text-gray-300">
								Problem No.
							</TableHead>
							<TableHead className="text-gray-300">
								Title
							</TableHead>
							<TableHead className="text-gray-300 text-center ">
								Difficulty
							</TableHead>
							<TableHead className="text-gray-300 text-right">
								Likes
							</TableHead>
							<TableHead className="text-gray-300 text-center">
								Submissions
							</TableHead>
							<TableHead className="text-gray-300 text-center">
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="border border-code-border">
						{problems.map((problem) => (
							<TableRow
								key={problem.id}
								className="border-b border-gray-700 hover:bg-gray-750"
							>
								<TableCell className="font-normal text-gray-200 cursor-pointer hover:text-blue-400">
									{problem.problemNo}
								</TableCell>
								<TableCell className="font-normal text-gray-200 cursor-pointer hover:text-blue-400">
									{problem.title}
								</TableCell>
								<TableCell className="text-center ">
									<span
										className={`rounded-full px-2 py-1 text-xs font-medium ${
											problem.difficulty === "Easy"
												? "bg-green-500/20 text-green-300"
												: problem.difficulty ===
												  "Medium"
												? "bg-yellow-500/20 text-yellow-300"
												: "bg-red-500/20 text-red-300"
										}`}
									>
										{problem.difficulty}
									</span>
								</TableCell>
								<TableCell className="text-right">
									<div className="flex items-center justify-end space-x-1">
										<Star className="h-4 w-4 text-yellow-400" />
										<span>{problem.likes}</span>
									</div>
								</TableCell>
								<TableCell className="text-center">
									<div className="flex items-center justify-center space-x-1">
										<BarChart className="h-4 w-4 text-blue-400" />
										<span>{problem.submissions}</span>
									</div>
								</TableCell>
								<TableCell className="text-center">
									<Button
										size="icon"
										className="rounded-full"
									>
										<Ellipsis className="h-4 w-4 text-blue-400" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<div className="flex flex-row items-center justify-start mt-5">
				<div>
					<CustomPagination />
				</div>
			</div>
		</main>
	);
};

export default ProblemsPage;
