import { Outlet } from "react-router-dom";
import { ProblemNavBar } from "@/components/common/ProblemNavBar";

export const MainLayout = () => {
	return (
		<main>
			<ProblemNavBar />
			<Outlet />
		</main>
	);
};
