import { Outlet } from "react-router-dom";
import { ProblemNavBar } from "@/client/components/common/ProblemNavBar";

export const MainLayout = () => {
	return (
		<main>
			<ProblemNavBar />
			<Outlet />
		</main>
	);
};
