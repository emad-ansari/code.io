import { Problem } from "./Problem";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { memo } from "react";

const ProblemList = memo(() => {
	const { problems } = useSelector(
		(state: RootState) => state.problem
	);

	return (
		<div className="flex flex-col gap-2">
			{problems.map((p) => {
				return (
					<Problem
						key={p.id}
						id={p.id}
						title={p.title}
						status={p.problemStatus ? p.problemStatus.status : ""}
						difficulty={p.difficulty}
						problemNo={p.problemNo}
					/>
				);
			})}
		</div>
	);
});

export default ProblemList;
