import { Outlet } from "react-router-dom";
import { ProblemNavBar } from "../components/ProblemNavBar";

export const ProblemStatementPageLayOut = () => {
	return (
		<>
			<ProblemNavBar isProbleDescriptioPage={true} />
			<Outlet />
		</>
	);
};
