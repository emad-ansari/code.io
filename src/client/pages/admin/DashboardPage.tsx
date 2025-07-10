import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { DashboardHeader } from "@/client/components/common/DashboardHeader";
import { SideBar } from "@/client/components/common/SideBar";

interface TokenPayload extends JwtPayload {
	role: "user" | "admin";
}

const DashboardPage = () => {
	const navigate = useNavigate();
	// const token = localStorage.getItem("CToken");
	// const decodedToken = token ? jwtDecode<TokenPayload>(token) : null;
	// const userRole = decodedToken?.role;
	
	const [isSidebarCollapsed, setIsSidebarCollapsed] =
		useState<boolean>(false);

	// useEffect(() => {
	// 	if (userRole !== "admin") {
	// 		navigate("/");
	// 	}
	// });

	const toggleSidebar = () => {
		setIsSidebarCollapsed(!isSidebarCollapsed);
	};

	return (
		<div className="flex h-screen bg-[#1c2432] text-gray-50">
			<SideBar
				isSidebarCollapsed={isSidebarCollapsed}
				onToggle={toggleSidebar}
			/>
			<main className="flex-1 flex flex-col bg-code-bg">
				<DashboardHeader />
				<div
					className={`fixed top-20 right-0 bottom-0 flex-1 px-12 py-4 overflow-y-scroll transition-all duration-300 ease-in-out ${
						isSidebarCollapsed ? "left-16" : "left-64"
					}`}
				>
					<Outlet />
				</div>
			</main>
		</div>
	);
};
export default DashboardPage;
