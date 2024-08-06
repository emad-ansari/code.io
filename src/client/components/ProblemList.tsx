import { Problem } from "../components/Problem";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { memo } from "react";

export const ProblemList = memo(() => {
	const { problems } = useSelector((state: RootState) => state.problem);
	
	return (
		
    <div className="flex flex-col gap-2">
      {problems.map((problem) => {
        return (
          <Problem
            key={problem.problemId}
            title={problem.problemTitle}
            status={problem.problemStatus}
            level={problem.difficultyLevel}
            problemNo={problem.problemNo}
          />
        );
      })}
    </div>
	);
});
