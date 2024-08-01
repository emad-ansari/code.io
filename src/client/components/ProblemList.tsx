import { Problem } from "../components/Problem";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { memo } from 'react';



export const ProblemList = memo(() => {
  // Todo - only render the MAX_PROBLEM_LIMIT
  // calculate the number of pagination count and setPagination count
  const { problems } = useSelector((state: RootState) => state.problem);

  // 

  return (
    <>
      {problems.map((problem) => {
        return (
          <Problem
            key={problem.problemId}
            title={problem.problemTitle}
            status={problem.problemStatus}
            level={problem.problemLevel}
          />
        );
      })}
    </>
  );
});
