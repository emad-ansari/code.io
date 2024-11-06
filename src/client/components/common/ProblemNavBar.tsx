import { startTransition } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircleUserRound } from "lucide-react";

import { useAppDispatch, RootState } from "@/client/app/store";
import { logOut } from "@/client/features/authSlice";
import { Button } from "@/client/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import CodeInLogo from "@/assets/websiteLogo.svg";


export const ProblemNavBar = ({
	isProbleDescriptioPage,
}: {
	isProbleDescriptioPage: boolean;
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
		<nav className="flex flex-row justify-between items-center bg-PRIMARY fixed top-0 left-0 right-0 z-50 ">
			<div className="flex-none items-center justify-start w-96">
				<img
					src={CodeInLogo}
					alt="Logo"
					className="w-40 h-16 object-cover cursor-pointer"
					onClick={() => {
						startTransition(() => {
							navigate("/");
						});
					}}
				/>
			</div>
			<div className="flex flex-1 flex-row items-center  text-white">
				{!isProbleDescriptioPage && (
					<div className="bg-darkGray flex items-center h-11 rounded-full  shadow-md border border-[#334155] text-sm gap-5 px-5">
						{navItems.map((item) => (
							<a
								href={item.href}
								onClick={(e) => onNavigation(e, item.href)}
								className={`text-sm font-dmMono px-4 py-2 rounded-full hover:bg-gray-800 ${item.active && "bg-gray-800"}`}
							>
								{item.label}
							</a>
						))}
					</div>
				)}
				{!isLogin ? (
					<div className="flex flex-1 justify-end pr-5">
						<div className="flex gap-3 items-center">
							{/* <MdOutlineNightlightRound className="hover:bg-gray-800 w-10 h-10 rounded-full px-3 py-3 cursor-pointer border border-[#334155]" /> */}
							<Button
								variant="ghost"
								className=" hover:bg-darkGray  hover:text-white  border border-[#334155]"
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
								className=" hover:bg-darkGray  hover:text-white  border border-[#334155]"
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
								className="bg-gray-900 text-white border border-BORDER"
							>
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>Settings</DropdownMenuItem>
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
	);
};
