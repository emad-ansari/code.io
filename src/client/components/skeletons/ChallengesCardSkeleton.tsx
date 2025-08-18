import { Skeleton } from "../ui/skeleton";

export const ChallengesCardSkeleton = () => {
	const array = Array(4).fill(null);
	return (
		<div className="flex flex-col md:flex-row  h-auto gap-4 border-[1.5px] border-code-border rounded-2xl py-3 pl-3 pr-5 shadow-lg cursor-pointer">
			<div className="hidden md:flex  md:w-34 md:h-34 self-center md:shrink-0 ">
				<Skeleton className="bg-code-dark h-full w-full" />
			</div>

			<div className="flex flex-col gap-5 ">
				<div className="flex justify-between ">
					<Skeleton className="bg-code-dark h-7 w-40" />
				</div>

				<div className="flex flex-wrap items-center gap-3.5 ">
					{array.map((_, i) => {
						return (
							<Skeleton
								key={i}
								className="rounded-full bg-code-dark w-20 h-7"
							/>
						);
					})}
				</div>
			</div>

			<div
				className={`flex flex-row gap-2  shrink-0 pt-3 pb-2 justify-end`}
			>
				<Skeleton className="bg-code-dark  w-30 h-4" />
			</div>
		</div>
	);
};
