import { Problem } from "../components/Problem";
import { problems } from "../pages/problems";
import { memo } from 'react';

export const ProblemList = memo(() => {
  return (
    <>
      {problems.map((problem) => {
        return (
          <Problem
            key={problem.id}
            title={problem.title}
            status={problem.status}
            level={problem.level}
          />
        );
      })}
    </>
  );
});
