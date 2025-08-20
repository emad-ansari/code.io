import { useEffect } from "react";
import { Clock4 } from "lucide-react";
import { useSelector } from "react-redux";

import { useAppDispatch, RootState } from "@/app/store";
import { fetchUserSubmissions } from "@/features/problemSlice";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatDate } from '@/lib/types'

export function ProblemSubmissions() {
	const dispatch = useAppDispatch();
	const { userSubmissions } = useSelector(
		(state: RootState) => state.problem
	);
	const { isLogin } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (isLogin) {
			dispatch(fetchUserSubmissions());
		}
	}, []);

	if (userSubmissions.length == 0) {
		return (
			<h1 className="text-center font-fugaz text-xl pt-10">
				No submission made yet 😐
			</h1>
		);
	}
	console.log('user submission: ', userSubmissions)

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
						<TableHead className="text-gray-300 text-center">
							Created At
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{userSubmissions.map((submission) => (
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
								<span className="flex w-16 justify-center bg-code-btn px-1 py-0.5 items-center  rounded-full  ">
									{submission.language}
								</span>
							</TableCell>
							<TableCell className="text-center text-gray-300">
								<div className="flex items-center justify-left space-x-1.5">
									<Clock4
										size={15}
										className="text-muted-foreground"
									/>
									<span>{submission.time} ms</span>
								</div>
							</TableCell>
							<TableCell className="text-center text-gray-300">
								{submission.memory} MB
							</TableCell>
							<TableCell className="text-center text-gray-300">
								{formatDate(submission.createdAt.toString())}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
	);
}
