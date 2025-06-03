import React, { startTransition } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	AlignJustify,
	CodeXml,
	LogOut,
	Settings,
	Trophy,
	UserPen,
} from "lucide-react";

import { useAppDispatch, RootState } from "@/client/app/store";
import { logOut } from "@/client/features/authSlice";
import { Button } from "@/client/components/ui/button";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/client/components/ui/avatar";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from "@/client/components/ui/sheet";

interface ProbelemNaveBarProps {
	isProbleDescriptioPage: boolean;
}

const drawerItems = [
	{
		name: "Profile",
		icon: <UserPen className = "w-5 h-5"/>,
	},
	{
		name: "Problems",
		icon: <CodeXml className = "w-5 h-5"/>,
	},
	{
		name: "Contest",
		icon: <Trophy className = "w-5 h-5"/>,
	},
	{
		name: "Settings",
		icon: <Settings className = "w-5 h-5"  />,
	},
	{
		name: "Logout",
		icon: <LogOut className = "w-5 h-5"/>,
	},
];
export const ProblemNavBar: React.FC<ProbelemNaveBarProps> = ({
	isProbleDescriptioPage,
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const { isLogin } = useSelector((state: RootState) => state.user);
	const { isFullScreen } = useSelector((state: RootState )=>  state.editor)
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
	];

	return (
		<>
			<nav className={`flex justify-between items-center  bg-code-bg  h-16 w-full border-b border-slate-800 z-10 transition-all duration-500 ease-in-out ${isFullScreen ? 'hidden' : 'fixed'}`}>
				<div className="flex flex-1 items-center justify-start w-60 md:pl-16 pl-6 ">
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
				<div className="flex flex-1  items-center  text-white ">
					<div className="hidden md:flex items-center h-11 rounded-full shadow-md bg-code-bg  border border-code-border text-sm gap-5 px-5 ">
						{navItems.map((item) => (
							<a
								key={item.href}
								href={item.href}
								onClick={(e) => onNavigation(e, item.href)}
								className={`text-sm font-dmMono px-4 py-2 rounded-full hover:bg-code-hover ${
									item.active && "bg-code-hover"
								}`}
							>
								{item.label}
							</a>
						))}
					</div>
				</div>
				<div className="flex flex-1">
					{!isLogin ? (
						<div className="flex flex-1 justify-end pr-5">
							<div className="flex gap-2 items-center md:gap-3 ">
								<Button
									className=" hidden md:block border border-slate-800 duration-300 hover:shadow-md hover:shadow-gray-600 transitio"
									onClick={() =>
										navigate("/login", {
											state: { from: location },
										})
									}
								>
									LogIn
								</Button>
								<Button
									className=" border-[1px] border-slate-800 duration-300 hover:shadow-md hover:shadow-gray-600 transition"
									onClick={() => navigate("/signup")}
								>
									Signup
								</Button>
							</div>
						</div>
					) : (
						<div className="flex flex-1 justify-end md:pr-10 pr-4">
							<div className="hidden md:block cursor-pointer">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Avatar>
											<AvatarImage src="https://assets.leetcode.com/users/emad-ansari/avatar_1728627541.png" />
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
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
							<div className="md:hidden">
								<Sheet>
									<SheetTrigger>
										<Button
											size={"icon"}
											className="rounded-full hover:bg-slate-800 "
										>
											<AlignJustify />
										</Button>
									</SheetTrigger>
									<SheetContent
										side="top"
										className="bg-slate-800 border-none"
									>
										<SheetHeader>
											<div className="flex items-center gap-4 mb-5">
												<div className="">
													<Avatar className="bg-red-500 w-14 h-14">
														<AvatarImage src="https://assets.leetcode.com/users/emad-ansari/avatar_1728627541.png" />
														<AvatarFallback>
															CN
														</AvatarFallback>
													</Avatar>
												</div>

												<span className="text-white text-lg font-medium">
													Mohammad Emad{" "}
												</span>
											</div>

											<div className="flex flex-col gap-3 ">
												{drawerItems.map((item) => {
													return (
														<div key = {item.name} className="flex items-center gap-6 text-white hover:bg-slate-700 rounded-lg px-3 py-2 cursor-pointer transition duration-200
														">
															{item.icon}
															<span>{item.name}</span>
														</div>
													);
												})}
											</div>
										</SheetHeader>
									</SheetContent>
								</Sheet>
							</div>
						</div>
					)}
				</div>
			</nav>
		</>
	);
};

// <div className="flex flex-1 justify-end pr-5">
// 	<DropdownMenu>
// 		<DropdownMenuTrigger asChild>
// 			<Button size={"icon"} className="rounded-full hover:bg-slate-800 ">
// 				<AlignJustify />
// 			</Button>
// 		</DropdownMenuTrigger>
// 		<DropdownMenuContent
// 			align="end"
// 			className="bg-gray-900 text-white border border-codeio_border"
// 		>
// 			<DropdownMenuItem>Profile</DropdownMenuItem>
// 			<DropdownMenuItem>Settings</DropdownMenuItem>
// 			<DropdownMenuItem onClick={() => dispatch(logOut())}>
// 				Logout
// 			</DropdownMenuItem>
// 		</DropdownMenuContent>
// 	</DropdownMenu>
// </div>;
