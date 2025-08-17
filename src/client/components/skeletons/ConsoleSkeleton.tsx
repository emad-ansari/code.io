import { Skeleton } from "../ui/skeleton";

export const ConsoleSkeleton = () => {
	const array = Array(4).fill(null);

	return (
		<>
			<div className="flex flex-col px-4 py-2 gap-4 ">
				<div className="flex items-center justify-between">
					<Skeleton className="w-38 h-6  bg-code-dark" />
					<Skeleton className="w-40 h-7  bg-code-dark" />
				</div>
				<div className="flex gap-2">
					<div className="flex flex-col gap-2 w-[40%]">
						{array.map((i) => (
							<Skeleton key={i} className="w-full h-7 bg-code-dark" />
						))}
					</div>

					<Skeleton className="w-full h-36 bg-code-dark " />
				</div>
			</div>
		</>
	);
};
