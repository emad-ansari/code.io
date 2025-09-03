import React, { startTransition, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserDetails } from "@/features/authSlice";
import {
	AlignJustify,
	CodeXml,
	LogIn,
	LogOut,
	Settings,
	UserPen,
} from "lucide-react";

import { useAppDispatch, RootState } from "@/app/store";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from "@/components/ui/sheet";
import { logOut } from "@/features/authSlice";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const drawerItems = [
	{
		name: "Profile",
		icon: <UserPen className="w-5 h-5" />,
	},
	{
		name: "Problems",
		icon: <CodeXml className="w-5 h-5" />,
	},
	{
		name: "Settings",
		icon: <Settings className="w-5 h-5" />,
	},
	{
		name: "Logout",
		icon: <LogOut className="w-5 h-5" />,
	},
];

const navItems = [
	{
		label: "Home",
		href: "/",
		active: location.pathname === "/",
	},
	{
		label: "Problems",
		href: "/problemset",
		active: location.pathname === "/problemset",
	},
	{
		label: "CS Fundamentals",
		href: "/core-cs",
		active: location.pathname === "/core-cs",
	},
	{
		label: "Documents",
		href: "/documents",
		active: location.pathname === "/documents",
	},
];

export const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const { isLogin, user } = useSelector((state: RootState) => state.auth);
	const { isFullScreen } = useSelector((state: RootState) => state.editor);

	const onNavigation = (
		event: React.MouseEvent<HTMLAnchorElement>,
		path: string
	) => {
		event.preventDefault();
		startTransition(() => {
			navigate(path);
		});
	};

	useEffect(() => {
		if (isLogin) {
			dispatch(getUserDetails());
		}
	}, [isLogin, dispatch]);

	return (
		<>
			<nav
				className={`flex justify-between items-center bg-code-bg h-16 w-full  z-10 transition-all duration-500 ease-in-out ${
					isFullScreen ? "hidden" : "fixed"
				}`}
			>
				<div className="flex items-center h-full w-48 md:pl-10 pl-4 transition-all duration-500 ease-in-out">
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
							className=" text-[#EB8069]"
						/>
						<span className="text-2xl text-white font-medium font-fugaz">
							Code.io
						</span>
					</div>
				</div>
				<div className="hidden md:flex items-center h-full text-white">
					<div className="flex items-center gap-2 h-[80%] rounded-full shadow-md  border border-code-border text-sm px-1.5 ">
						{navItems.map((item) => (
							<NavLink
								key={item.href}
								to={item.href}
								onClick={(e) => onNavigation(e, item.href)}
								className={({ isActive }) =>
									`text-sm font-dmMono px-4 py-[11px]  rounded-full hover:bg-code-dark ${
										isActive && "bg-code-dark"
									}`
								}
							>
								{item.label}
							</NavLink>
						))}
					</div>
				</div>
				<div className="flex h-full items-center md:pr-2 pr-0">
					{isLogin ? (
						<div className="hidden md:flex flex-1  pr-8 md:pr-10  h-full items-center cursor-pointer ">
							<div className="flex items-center gap-4 md:pl-3 md:pr-1.5  h-[80%]  rounded-full md:border md:border-code-border">
								<span className="hidden md:block text-white text-sm transition-all duration-500 ease-in-out ">
									Hi, {user?.username}
								</span>
								<div className="cursor-pointer">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<div className="w-10 h-10 rounded-full">
												<Avatar className="w-full h-full rounded-full">
													<AvatarImage
														src={user?.imgUrl || "https://github.com/shadcn.png"}
														alt="@shadcn"
														className="rounded-full"
													/>
													<AvatarFallback>
														CN
													</AvatarFallback>
												</Avatar>
											</div>

											{/* <span className="w-10 h-10 rounded-full bg-code-dark flex items-center justify-center text-sm text-white tracking-widest">ME</span> */}
										</DropdownMenuTrigger>
										<DropdownMenuContent
											align="end"
											className="bg-code-bg text-white border border-code-border cursor-pointer"
										>
											<DropdownMenuItem
												className="hover:bg-gray-800 cursor-pointer "
												onClick={() =>
													navigate(`me/${user?.username}`)
												}
											>
												Profile
											</DropdownMenuItem>
											<DropdownMenuItem className="hover:bg-gray-800  cursor-pointer ">
												Settings
											</DropdownMenuItem>
											<DropdownMenuItem
												className="hover:bg-gray-800 cursor-pointer "
												onClick={() =>
													dispatch(logOut())
												}
											>
												Logout
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>
						</div>
					) : (
						<div className="hidden md:flex flex-1 justify-end pr-5 h-[80%] items-center">
							<div className="flex items-center md:gap-3  md:px-2">
								<Button
									className=" text-white text-sm hover:bg-code-dark cursor-pointer bg-none"
									onClick={() =>
										navigate("/login", {
											state: { from: location },
										})
									}
								>
									LogIn
								</Button>
								<Button
									variant={"default"}
									className="hidden md:block text-orange-500  cursor-pointer bg-orange-500/10 "
									onClick={() => navigate("/signup")}
								>
									Get started
								</Button>
							</div>
						</div>
					)}
					<div className="md:hidden flex items-center px-5">
						<Sheet>
							<SheetTrigger>
								<span className="rounded-full text-white bg-code-dark cursor-pointer ">
									<AlignJustify className="w-5 h-5" />
								</span>
							</SheetTrigger>
							<SheetContent
								side="top"
								className="bg-code-bg/95 border-none rounde-lg"
							>
								{isLogin ? (
									<SheetHeader>
										<div className="flex items-center gap-4 mb-5">
											<div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-700 shadow-md shadow-gray-700/20">
												<span className="text-white tracking-wide">
													ME
												</span>
											</div>

											<span className="text-white text-lg font-medium">
												Mohammad Emad{" "}
											</span>
										</div>
										<div className="flex flex-col gap-3 ">
											{drawerItems.map((item) => {
												return (
													<div
														key={item.name}
														className="flex items-center gap-6 text-white hover:bg-slate-700 rounded-lg px-3 py-2 cursor-pointer transition duration-200
														"
													>
														{item.icon}
														<span>{item.name}</span>
													</div>
												);
											})}
										</div>
									</SheetHeader>
								) : (
									<SheetHeader className="mt-6">
										<NavLink
											to="/problemset"
											className="flex items-center gap-4 hover:bg-slate-700 rounded-lg px-3 py-2 cursor-pointer transition duration-200 text-gray-300"
										>
											<CodeXml className="w-5 h-5" />
											<span>Problems</span>
										</NavLink>
										<NavLink
											to="/login"
											className="flex items-center gap-4 text-gray-300 hover:bg-slate-700 rounded-lg px-3 py-2 cursor-pointer transition duration-200"
										>
											<LogIn className="w-5 h-5" />
											<span>Login</span>
										</NavLink>
									</SheetHeader>
								)}
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</nav>
		</>
	);
};
