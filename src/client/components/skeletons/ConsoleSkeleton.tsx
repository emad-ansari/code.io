import { Skeleton } from "../ui/skeleton";

export const ConsoleSkeleton = () => {
	return (
		<>
			<div className="px-4 py-2 flex flex-col gap-4">
				<div className="flex flex-row items-center justify-between">
					<Skeleton className="h-6 w-[200px] bg-gray-800" />
					<Skeleton className="h-4 w-[120px] bg-gray-800" />
				</div>
				<div>
					<div className="flex flex-row gap-3 mb-6">
						<Skeleton className="h-9 w-[80px] bg-gray-800" />
						<Skeleton className="h-9 w-[80px] bg-gray-800" />
						<Skeleton className="h-9 w-[80px] bg-gray-800" />
					</div>

					<div className="flex flex-col gap-4">
						<Skeleton className="h-12 w-[90%] bg-gray-800" />
						<Skeleton className="h-12 w-[90%] bg-gray-800" />
						<Skeleton className="h-12 w-[90%] bg-gray-800" />
					</div>
				</div>
			</div>
		</>
	);
};
