import { useEffect } from 'react';
import { Clock4 } from "lucide-react";
import { useSelector } from 'react-redux';

import { useAppDispatch, RootState } from '@/client/app/store';
import { fetchUserSubmissions } from '@/client/features/problemSlice';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/client/components/ui/table";

const submissions = [
	{
		id: 1,
		status: "Accepted",
		langauge: "Java",
		runTime: "0.056",
		memory: "39.6",
	},
	{
		id: 2,
		status: "Wrong Answer",
		langauge: "Java",
		runTime: "N/A",
		memory: "39.6",
	},
	{
		id: 3,
		status: "Time Limit Exceeded",
		langauge: "Java",
		runTime: "0.056",
		memory: "39.6",
	},
];

export function ProblemSubmissions() {
	const dispatch = useAppDispatch();
	const { userSubmissions } = useSelector((state: RootState) => state.problem);
	const { isLogin } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (isLogin) {
			dispatch(fetchUserSubmissions());
		}
	}, [])


	return (
		<section>
			<Table className=" overflow-hidden  ">
				<TableHeader>
					<TableRow className="border-b border-code-border  hover:bg-gray-750">
						<TableHead className="text-gray-300">Status</TableHead>
						<TableHead className="text-gray-300 text-left">
							Language
						</TableHead>
						<TableHead className="text-gray-300 text-left ">
							Run Time
						</TableHead>
						<TableHead className="text-gray-300 text-center">
							Memory
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{submissions.map((submission) => (
						<TableRow
							key={submission.id}
							className="border-b border-gray-700 hover:bg-gray-750"
						>
							<TableCell
								className={`font-medium ${
									submission.status === "Accepted"
										? "text-code-green"
										: "text-code-red"
								}`}
							>
								{submission.status}
							</TableCell>
							<TableCell className="text-left">
								<span className="bg-code-btn px-3 py-0.5 rounded-full align-middle ">
									{submission.langauge}
								</span>
							</TableCell>
							<TableCell className="text-center text-gray-300">
								<div className="flex items-center justify-left space-x-1.5">
									<Clock4 size={15} className="text-muted-foreground" />
									<span>{submission.runTime} ms</span>
								</div>
							</TableCell>
							<TableCell className="text-center text-gray-300">
								{submission.memory} MB
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
	);
}
