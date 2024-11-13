import { useState} from 'react';
import { DashboardHeader } from "@/client/components/common/DashboardHeader"
import { SideBar } from "@/client/components/common/SideBar"
import { Outlet } from "react-router-dom"


const DashboardPage = () => {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
	const toggleSidebar = () => {
		setIsSidebarCollapsed(!isSidebarCollapsed);
	};
    return (
        <div className="flex h-screen bg-gray-950 text-gray-50">
			<SideBar isSidebarCollapsed = {isSidebarCollapsed}  onToggle={toggleSidebar}/>
			<main className="flex-1 flex flex-col">
				<DashboardHeader/>
				<div className={`fixed top-20 right-0 bottom-0 flex-1 p-4 overflow-y-scroll transition-all duration-300 ease-in-out ${isSidebarCollapsed ? "left-16" : "left-64"}`}>
                     <Outlet /> 
				</div>
			</main>
		</div>
    )
}
export default DashboardPage;