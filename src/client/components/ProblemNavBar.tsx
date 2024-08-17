import CodeInLogo from "../../assets/websiteLogo.svg";
import { NavLink } from "react-router-dom";

export const ProblemNavBar = () => {
	return (
		<nav className="flex flex-row justify-between items-center bg-PRIMARY fixed top-0 left-0 right-0">
			<div className="flex-none items-center justify-start w-96">
				<img
					src={CodeInLogo}
					alt="Logo"
					className="w-40 h-16 object-cover cursor-pointer"
				/>
			</div>
			<div className="flex flex-1 flex-row items-center justify-start  text-white">
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
			</div>
		</nav>
	);
};
