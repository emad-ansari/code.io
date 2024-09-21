import CodeInLogo from "../../../assets/websiteLogo.svg";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineNightlightRound } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/client/app/store";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export const ProblemNavBar = ({
	isProbleDescriptioPage,
}: {
	isProbleDescriptioPage: boolean;
}) => {
	const navigate = useNavigate();
	const location = useLocation();

	const { isLogin } = useSelector((state: RootState) => state.user);

	return (
		<nav className="flex flex-row justify-between items-center bg-PRIMARY fixed top-0 left-0 right-0 z-50 ">
			<div className="flex-none items-center justify-start w-96">
				<img
					src={CodeInLogo}
					alt="Logo"
					className="w-40 h-16 object-cover cursor-pointer"
					onClick={() => navigate("/")}
				/>
			</div>
			<div className="flex flex-1 flex-row items-center  text-white">
				{!isProbleDescriptioPage &&  (
					<div className="bg-darkGray flex items-center h-11 rounded-full  shadow-md border border-[#334155] text-sm gap-5 px-5">
						<NavLink
							to={"/problemset/"}
							className={({ isActive }) =>
								`text-sm font-dmMono  px-4 py-2 rounded-full  hover:bg-gray-800 ${
									isActive ? "bg-hover" : ""
								}`
							}
						>
							Problems
						</NavLink>

						<NavLink
							to={"contests"}
							className={({ isActive }) =>
								`text-sm font-dmMono  px-4 py-2 rounded-full  hover:bg-gray-800 ${
									isActive ? "bg-hover" : ""
								}`
							}
						>
							Contests
						</NavLink>

						<NavLink
							to={"standings"}
							className={({ isActive }) =>
								`text-sm font-dmMono  px-4 py-2 rounded-full  hover:bg-gray-800 ${
									isActive ? "bg-hover" : ""
								}`
							}
						>
							Standings
						</NavLink>
						<NavLink
							to={"/contribution"}
							className={({ isActive }) =>
								`text-sm font-dmMono  px-4 py-2 rounded-full  hover:bg-gray-800 ${
									isActive ? "bg-hover" : ""
								}`
							}
						>
							Contribution
						</NavLink>
					</div>
				)}
				{!isLogin ? (
					<div className="flex flex-1 justify-end pr-5">
						<div className="flex gap-3 items-center">
							<MdOutlineNightlightRound className="hover:bg-gray-800 w-10 h-10 rounded-full px-3 py-3 cursor-pointer border border-[#334155]" />
							<Button
								variant="ghost"
								className=" hover:bg-darkGray  hover:text-white  border border-[#334155]"
								onClick={() => navigate("/login",  { state: { from: location } })}
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
								<FaUserCircle className="cursor-pointer w-9 h-9" />
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="bg-gray-900 text-white"
							>
								<DropdownMenuItem className="bg-gray-900">
									Profile
								</DropdownMenuItem>
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuItem>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}
			</div>
		</nav>
	);
};
