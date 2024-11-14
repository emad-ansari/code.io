import React, { startTransition } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircleUserRound, CodeXml } from "lucide-react";

import { useAppDispatch, RootState } from "@/client/app/store";
import { logOut } from "@/client/features/authSlice";
import { Button } from "@/client/components/ui/button";


import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ProbelemNaveBarProps {
	isProbleDescriptioPage: boolean;
}
export const ProblemNavBar: React.FC<ProbelemNaveBarProps> = ({
	isProbleDescriptioPage,
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const { isLogin } = useSelector((state: RootState) => state.user);

	const onNavigation = (
		event: React.MouseEvent<HTMLAnchorElement>,
		path: string
	) => {
		event.preventDefault(); // Prevent default link behavior
		startTransition(() => {
			navigate(path); // Navigate to the path
		});
	};
	const isAdminPage = location.pathname.startsWith("/admin");

	const navItems = [
		{
			label: "Problems",
			href: "/problemset",
			active: location.pathname === "/problemset",
		},
		{
			label: "Contests",
			href: "/contests",
			active: location.pathname === "/contests",
		},
		{
			label: "Standings",
			href: "/standings",
			active: location.pathname === "/standings",
		},
		{
			label: "Contribution",
			href: "/contribution",
			active: location.pathname === "/contribution",
		},
	];

	return (
		<>
			{!isAdminPage && (
				<nav className="flex flex-row justify-between items-center  bg-code-bg fixed top-0 left-0 right-0 z-50 h-14">
					<div className="flex-none items-center justify-start w-96 pl-5">
						<div
							className="flex space-x-2 items-center cursor-pointer"
							onClick={() => {
								startTransition(() => {
									navigate("/");
								});
							}}
						>
							<CodeXml
								strokeWidth={3}
								size={28}
								className=" text-white"
							/>
							<span className="text-2xl text-white font-medium font-fugaz">
								Code.io
							</span>
						</div>
					</div>
					<div className="flex flex-1 flex-row items-center  text-white">
						{!isProbleDescriptioPage && (
							<div className="bg-code-bg flex items-center h-11 rounded-full  shadow-md border border-code-border text-sm gap-5 px-5">
								{navItems.map((item) => (
									<a
										key={item.href}
										href={item.href}
										onClick={(e) =>
											onNavigation(e, item.href)
										}
										className={`text-sm font-dmMono px-4 py-2 rounded-full hover:bg-code-hover ${
											item.active && "bg-code-hover"
										}`}
									>
										{item.label}
									</a>
								))}
							</div>
						)}
						{!isLogin ? (
							<div className="flex flex-1 justify-end pr-5">
								<div className="flex gap-3 items-center">
									<Button
										variant="ghost"
										className=" hover:bg-darkGray  hover:text-white  border border-code-border"
										onClick={() =>
											navigate("/login", {
												state: { from: location },
											})
										}
									>
										LogIn
									</Button>
									<Button
										variant="ghost"
										className=" hover:bg-darkGray  hover:text-white  border border-code-border"
										onClick={() => navigate("/signup")}
									>
										Signup
									</Button>
								</div>
							</div>
						) : (
							<div className="flex flex-1 justify-end pr-5">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<CircleUserRound
											size={40}
											strokeWidth={1}
											className="cursor-pointer"
										/>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="end"
										className="bg-gray-900 text-white border border-codeio_border"
									>
										<DropdownMenuItem>
											Profile
										</DropdownMenuItem>
										<DropdownMenuItem>
											Settings
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => dispatch(logOut())}
										>
											Logout
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						)}
					</div>
				</nav>
			)}
		</>
	);
};
