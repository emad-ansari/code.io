import { memo, startTransition } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	BarChart,
	Star,
	CircleCheckBig,
	Contrast,
	Squircle,
} from "lucide-react";
import { RootState } from "@/client/app/store";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/client/components/ui/table";


const ProblemList = memo(() => {
	const navigate = useNavigate();
	const { category } = useParams(); 
	const { problems } = useSelector((state: RootState) => state.problem);
	
	const onNavigate = (problemId: string) => {
		startTransition(() => {
			navigate(`../${category}/${problemId}/description`);
		});
	};

	return (
		<div className="flex flex-col gap-2">
			<Table className="overflow-hidden rounded-lg border-[1.5px] border-slate-800">
				<TableHeader>
					<TableRow className="border-b-[1.5px] border-slate-800 bg-slate-800  hover:bg-gray-750">
						<TableHead className="text-gray-300">Status</TableHead>
						<TableHead className="text-gray-300">Title</TableHead>
						<TableHead className="text-gray-300 text-center ">
							Difficulty
						</TableHead>
						<TableHead className="text-gray-300 text-right">
							Likes
						</TableHead>
						<TableHead className="text-gray-300 text-right">
							Submissions
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="border-[1.5px] border-slate-800">
					{problems.map((problem) => (
						<TableRow
							key={problem.id}
							className="border-b-[1.5px] border-slate-800 hover:bg-gray-750"
						>
							<TableCell>
								{problem.status === "Solved" ? (
									<CircleCheckBig
										size={16}
										absoluteStrokeWidth
										className="text-[#4ac3ab]"
									/>
								) : problem.status ===
								  "Attempted" ? (
									<Contrast
										size={16}
										absoluteStrokeWidth
										className="text-code-yellow"
									/>
								) : (
									<Squircle
										size={17}
										className="text-gray-400"
									/>
								)}
							</TableCell>
							<TableCell
								className="font-normal text-gray-200 cursor-pointer hover:text-blue-400"
								onClick={() => onNavigate(problem.id)}
							>
								{problem.title}
							</TableCell>
							<TableCell className="text-center ">
								<span
									className={`rounded-full px-2 py-1 text-xs font-medium ${
										problem.difficulty === "Easy"
											? "bg-green-500/20 text-green-300"
											: problem.difficulty === "Medium"
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
									<span className="text-white">
										{problem.likes}
									</span>
								</div>
							</TableCell>
							<TableCell className="text-right">
								<div className="flex items-center justify-end space-x-1">
									<BarChart className="h-4 w-4 text-blue-400" />
									<span className="text-white">
										{problem.submissions}
									</span>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
});

export default ProblemList;
