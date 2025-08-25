import { Outlet } from "react-router-dom";
import { Header } from "@/components/common/header";

export const MainLayout = () => {
	return (
		<main>
			<Header />
			<Outlet />
		</main>
	);
};
