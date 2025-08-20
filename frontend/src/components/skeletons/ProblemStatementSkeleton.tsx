import { Skeleton } from "../ui/skeleton";

export const ProblemStatementSkeleton = () => {
	return (
		<div className="flex flex-col gap-4 px-5 pb-3 overflow-y-scroll scroll-smooth h-[93%]">
			<div className="flex flex-col gap-5 pt-5 ">
				<div className="flex flex-row items-center justify-between">
					<Skeleton className="h-6 w-[200px] bg-gray-800 rounded" />
					<div className="flex gap-4">
						<Skeleton className="h-6 w-[100px] bg-gray-800 rounded-full" />
						<Skeleton className="h-6 w-[100px] bg-gray-800 rounded-full" />
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<Skeleton className="h-3 w-[100%] bg-gray-800" />
					<Skeleton className="h-3 w-[100%] bg-gray-800" />
					<Skeleton className="h-3 w-[100%] bg-gray-800" />
					<Skeleton className="h-3 w-[50%] bg-gray-800" />
				</div>
			</div>
			<div className="flex flex-col gap-8 mt-4">
				<div className="flex flex-col gap-4">
					<Skeleton className="h-5 w-[120px] bg-gray-800 rounded" />
					<Skeleton className="h-16 w-[90%] bg-gray-800 rounded" />
				</div>
				<div className="flex flex-col gap-4">
					<Skeleton className="h-5 w-[120px] bg-gray-800 rounded" />
					<Skeleton className="h-16 w-[90%] bg-gray-800 rounded" />
				</div>
				<div className="flex flex-col gap-4">
					<Skeleton className="h-5 w-[120px] bg-gray-800 rounded" />
					<Skeleton className="h-16 w-[90%] bg-gray-800 rounded" />
				</div>
			</div>
		</div>
	);
};
