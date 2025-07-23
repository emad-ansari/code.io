
import { ChallengesCard } from "@/client/components/common/ChallengesCard";
import { challengesCard } from "@/client/lib/types";

export const ProblemChallenges = () => {
	
	return (
		<main className="bg-code-bg pt-16 text-white h-screen flex justify-center ">
			<div className="flex flex-col w-[60%] pt-12 overflow-y-scroll">
				<h1 className="text-4xl font-bold  mb-8 bg-gradient-to-r from-white via-[#f5b2a2] to-[#e47a66] bg-clip-text text-transparentt">
					Coding Challenges
					{/* Coding <span className="text-code-orange">Challenges</span> */}
				</h1>
				<div className="flex flex-col gap-5 py-2">
					{challengesCard.map((c) => {
						return (
							<ChallengesCard
								key = {c.id}
								id={c.id}
								title={c.title}
								type={c.type}
								imgUrl={c.imgUrl}
								tags={c.tags}
								solvedChallenges={c.solvedChallenges}
								totalChallenges={c.totalChallenges}
							/>
						);
					})}
				</div>
			</div>
		</main>
	);
};
