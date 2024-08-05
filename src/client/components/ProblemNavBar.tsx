import CodeInLogo from "../../assets/websiteLogo.svg";
import { NavLink } from "react-router-dom";

export const ProblemNavBar = () => {
	return (
		<nav className="flex flex-row justify-between items-center bg-PRIMARY">
			<div className="flex-none items-center justify-start w-96">
				<img
					src={CodeInLogo}
					alt="Logo"
					className="w-40 h-16 object-cover cursor-pointer"
				/>
			</div>
			<div className="flex flex-1 flex-row items-center justify-start  text-white">
				<div className="bg-[#0D1621] flex items-center h-11 rounded-full  shadow-md border border-[#334155] text-sm gap-5 px-5">
					<NavLink
						to={"/problemset"}
						className="text-sm font-dmMono focus:bg-[#334155] px-4 py-2 rounded-full  hover:bg-[#334155]"
					>
						Problems
					</NavLink>

					<NavLink
						to={"/contests"}
						className="text-sm font-dmMono focus:bg-[#334155] px-4 py-2 rounded-full  hover:bg-[#334155]"
					>
						Contests
					</NavLink>

					<NavLink
						to={"/standings"}
						className="text-sm font-dmMono focus:bg-[#334155] px-4 py-2 rounded-full  hover:bg-[#334155] active:bg-[#334155]"
					>
						Standings
					</NavLink>
				</div>
			</div>
		</nav>
	);
};

