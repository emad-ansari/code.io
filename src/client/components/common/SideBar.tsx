import { useNavigate } from "react-router-dom";
import {
	ChevronLeft,
	ChevronRight,
	BookOpenCheck,
	CodeXml,
    User
} from "lucide-react";
import { Button } from "@/client/components/ui/button";
import React, { startTransition } from "react";

interface SidebarProps {
	isSidebarCollapsed: boolean;
	onToggle: () => void;
}

export const SideBar: React.FC<SidebarProps> = ({ isSidebarCollapsed, onToggle }) => {
	const sidebarItems = [
        { icon: <User className="h-5 w-5" />, label: "Users" },
		{ icon: <CodeXml className="h-5 w-5" />, label: "Problems" },
		{ icon: <BookOpenCheck className="h-5 w-5" />, label: "Testcases" },
	];
	const navigate = useNavigate();

	return (
		<div className="relative h-screen border border-r-slate-800 border-t-transparent border-l-transparent border-b-transparent box-border">
			<aside
				className={`bg-code-bg fixed top-0 left-0 h-full  transition-all duration-300 ease-in-out  ${
					isSidebarCollapsed ? "w-16" : "w-64"
				} relative flex flex-col`}
			>
				<div
					className={`flex items-center ${
						isSidebarCollapsed
							? "justify-center"
							: "justify-between"
					} p-4`}
				>
					<div className="flex items-center">
						<span className="text-2xl font-bold text-purple-500 ">
							<CodeXml />
						</span>
						{!isSidebarCollapsed && (
							<span className="ml-2 text-xl font-bold">
								Code.In
							</span>
						)}
					</div>
					{!isSidebarCollapsed && (
						<Button
							variant="ghost"
							size="icon"
							onClick={() => onToggle()}
							className="text-gray-400 rounded-full hover:text-gray-100 hover:bg-gray-800 "
							aria-label="Collapse sidebar"
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
					)}
				</div>

				<div className="flex-1 overflow-y-auto mt-6">
					<nav className="px-2 py-4">
						<ul className="space-y-2">
							{sidebarItems.map((item, index) => (
								<li key={index}>
									<Button
										variant="ghost"
										className={`w-full hover:text-white ${
											isSidebarCollapsed
												? "justify-center p-2"
												: "justify-start px-3 py-2"
										} hover:bg-gray-800`}
										title={item.label}
										onClick={() =>
											startTransition(() => {
												navigate(`${item.label.toLocaleLowerCase()}`);
											})
										}
									>
										{item.icon}
										{!isSidebarCollapsed && (
											<span className="ml-3">
												{item.label}
											</span>
										)}
									</Button>
								</li>
							))}
						</ul>
					</nav>
				</div>

				{isSidebarCollapsed && (
					<Button
						variant="ghost"
						size="icon"
						onClick={() => onToggle()}
						className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-gray-400 hover:text-gray-100 hover:bg-gray-700 rounded-full shadow-lg"
						aria-label="Expand sidebar"
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				)}
			</aside>
		</div>
	);
};
