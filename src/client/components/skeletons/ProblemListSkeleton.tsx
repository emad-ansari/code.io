import { Skeleton } from "../ui/skeleton";

export const ProblemListSkeleton = () => {
    const array = Array(5).fill(null);

	return (
		<div className="flex flex-col gap-2">
			{array.map((_, i) => {
				return (
					<Skeleton className = "h-14 w-full bg-gray-800" key = {i}/>
				);
			})}
		</div>
	);
};
