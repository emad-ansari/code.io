import { Skeleton } from "@/components/ui/skeleton";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export const ProblemListSkeleton = () => {
	const array = Array(6).fill(null);

	return (
		<div className="flex flex-col gap-2">
			<Table className="rounded-lg overflow-hidden border border-code-border bg-code-bg-secondary">
				<TableHeader>
					<TableRow className="border-b border-code-border hover:bg-gray-750">
						<TableHead className="text-gray-300">Status</TableHead>
						<TableHead className="text-gray-300">Title</TableHead>
						<TableHead className="text-gray-300 text-right ">
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
				<TableBody>
					{array.map((_, index) => (
						<TableRow
							key={index}
							className="border-b border-gray-700 hover:bg-gray-750 "
						>
							<TableCell>
								<Skeleton className="rounded-full w-4 h-4 bg-gray-700" />
							</TableCell>
							<TableCell className="">
								<Skeleton className="rounded-lg w-full h-3 bg-gray-700 " />
							</TableCell>
							<TableCell className="text-right">
								<Skeleton className="rounded-full w-16 h-6 bg-gray-700 " />
							</TableCell>
							<TableCell className="text-right">
								<Skeleton className="rounded-lg w-12 h-3 bg-gray-700" />
							</TableCell>
							<TableCell className="text-right">
								<Skeleton className="rounded-lg w-12 h-3 bg-gray-700" />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
