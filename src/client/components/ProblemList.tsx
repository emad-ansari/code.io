import { Problem } from "../components/Problem";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { memo } from "react";

export const ProblemList = memo(() => {
	const { problemSet } = useSelector((state: RootState) => state.problem);
	console.log('Problem component re-render');

	return (
		
    <div className="flex flex-col gap-2">
      {problemSet.map((problem) => {
        return (
          <Problem
            key={problem.problemId}
            title={problem.problemTitle}
            status={problem.problemStatus}
            level={problem.difficultyLevel}
          />
        );
      })}
    </div>
	);
});
