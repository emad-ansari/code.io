import { Outlet } from "react-router-dom";

import NavBar from "@/components/common/nav-bar";
import MobileTabBar from "@/components/common/tabs";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export const MainLayout = () => {
	const { isLoggedIn } = useSelector((state: RootState) => state.auth);

	return (
		<main>
			<NavBar />
			<Outlet />
			<MobileTabBar isLoggedIn = {isLoggedIn}/>
		</main>
	);
};
