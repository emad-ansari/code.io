import { Problem } from "../components/Problem";
import { problems } from "../pages/problems";

export const ProblemList = () => {
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
};
