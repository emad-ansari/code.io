import { Problem } from "./Problem";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { memo } from "react";

const ProblemList = memo(() => {
	const { problems } = useSelector((state: RootState) => state.problem);
	
	return (
		
    <div className="flex flex-col gap-2">
      {problems.map((sp) => {
        return (
          <Problem
            key={sp.problem.id}
            id = {sp.problem.id}
            title={sp.problem.title}
            status={sp.status}
            difficulty={sp.problem.difficulty}
            problemNo={sp.problem.problemNo}
          />
        );
      })}
    </div>
	);
});

export default ProblemList;