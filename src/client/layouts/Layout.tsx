import { Outlet } from "react-router-dom";
import { ProblemNavBar } from "../components/ProblemNavBar";

export const Layout = () => {
	return (
		<>
			<ProblemNavBar isProbleDescriptioPage={false} />
			<Outlet />
		</>
	);
};
