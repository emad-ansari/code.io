import { ChallengesCard } from "@/client/components/common/ChallengesCard";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { useEffect } from "react";
import { fetchCategories } from "../features/problemCategorySlice";

export const ProblemChallenges = () => {
	const dispatch = useAppDispatch();
	const { categories} = useSelector((staet: RootState) => staet.problem_category);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [])
	
	return (
		<main className="bg-code-bg pt-16 text-white h-screen flex justify-center ">
			<div className="flex flex-col w-[60%] pt-12 overflow-y-scroll">
				<h1 className="text-4xl font-bold  mb-8 bg-gradient-to-r from-white via-[#f5b2a2] to-[#e47a66] bg-clip-text text-transparentt">
					Coding Challenges
					{/* Coding <span className="text-code-orange">Challenges</span> */}
				</h1>
				<div className="flex flex-col gap-5 py-2">
					{categories.map((cat) => {
						return (
							<ChallengesCard
								key = {cat.id}
								id={cat.id}
								name = {cat.name}
								title={cat.title}
								imgUrl={cat.imgUrl}
								tags={cat.tags}
								totalProblems ={cat.totalProblems}
								solvedProblems={cat.solvedProblems}
							/>
						);
					})}
				</div>
			</div>
		</main>
	);
};
