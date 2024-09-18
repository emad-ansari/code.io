// import { Outlet } from "react-router-dom"
import { NavLink, Outlet } from "react-router-dom";

export const Contribution = () => {
	return (
		<main className="flex justify-center flex-col fixed top-16 left-0 right-0 ">
			<TabBar />
			<Outlet />
		</main>
	);
};

export const TabBar = () => {
	return (
		<div className="flex justify-center items-center h-16 bg-PRIMARY">
			<div className="bg-darkGray h-11 px-5 flex items-center gap-3 rounded-full shadow-md border border-[#334155] ">
				<NavLink
					to="/contribution"
					end
					className={({ isActive }) =>
						`px-4 py-2 text-white text-sm font-dmMono rounded-full transition-colors duration-300 ${
							isActive ? "bg-hover text-white" : ""
						}`
					}
				>
					Problem
				</NavLink>
				<NavLink
					to="/contribution/testcase"
					className={({ isActive }) =>
						`px-4 py-2 mx-2 text-sm font-dmMono rounded-full transition-colors duration-300 ${
							isActive ? "bg-hover text-white" : "text-white"
						}`
					}
				>
					Test Case
				</NavLink>
			</div>
		</div>
	);
};
