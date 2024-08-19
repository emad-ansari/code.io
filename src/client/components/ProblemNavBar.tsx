import CodeInLogo from "../../assets/websiteLogo.svg";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineNightlightRound } from "react-icons/md";

export const ProblemNavBar = ({
	isProbleDescriptioPage,
}: {
	isProbleDescriptioPage: boolean;
}) => {
	return (
		<nav className="flex flex-row justify-between items-center bg-PRIMARY fixed top-0 left-0 right-0 z-50">
			<div className="flex-none items-center justify-start w-96">
				<img
					src={CodeInLogo}
					alt="Logo"
					className="w-40 h-16 object-cover cursor-pointer"
				/>
			</div>
			<div className="flex flex-1 flex-row items-center  text-white">
				{isProbleDescriptioPage ? (
					<div className="flex h-11 flex-1 items-center justify-end pr-5 relative gap-8">
						<MdOutlineNightlightRound className="bg-gray-800  w-10 h-10 rounded-full px-3 py-3 cursor-pointer" />

						<FaUserCircle className="cursor-pointer w-9 h-9"/>

						<FiLogOut className="bg-gray-800  w-10 h-10 rounded-full px-3 py-3 cursor-pointer " />
					</div>
				) : (
					<div className="bg-darkGray flex items-center h-11 rounded-full  shadow-md border border-[#334155] text-sm gap-5 px-5">
						<NavLink
							to={"/p/problemset"}
							className={({ isActive }) =>
								`text-sm font-dmMono  px-4 py-2 rounded-full  hover:bg-hover ${
									isActive ? "bg-hover" : ""
								}`
							}
						>
							Problems
						</NavLink>

						<NavLink
							to={"contests"}
							className={({ isActive }) =>
								`text-sm font-dmMono  px-4 py-2 rounded-full  hover:bg-hover ${
									isActive ? "bg-hover" : ""
								}`
							}
						>
							Contests
						</NavLink>

						<NavLink
							to={"standings"}
							className={({ isActive }) =>
								`text-sm font-dmMono  px-4 py-2 rounded-full  hover:bg-hover ${
									isActive ? "bg-hover" : ""
								}`
							}
						>
							Standings
						</NavLink>
					</div>
				)}
			</div>
		</nav>
	);
};
