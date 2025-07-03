import { Outlet, NavLink } from "react-router-dom";
import { Suspense } from "react";

import { ProblemStatementSkeleton } from "../skeletons/ProblemStatementSkeleton";

export const ProblemDescriptionSection = () => {

	return (
		<section className="rounded-lg bg-code-bg text-white  border-[1.5px] border-code-border ">
			<div className="flex items-center bg-code-bg px-2 py-1 rounded-tl-lg rounded-tr-lg gap-5  border border-b-[#334155] border-t-transparent border-l-transparent border-r-transparent">
				<NavLink
					className = {({ isActive }) => `px-3 py-1.5  hover:bg-gray-800 text-white rounded-md ${isActive && 'bg-code-hover'}`}
					to = {"description"}
				>
					Description
				</NavLink>

				<NavLink
					className = {({ isActive }) => `px-3 py-1.5  hover:bg-gray-800 text-white rounded-md ${isActive && 'bg-code-hover'}`}
					to = {"submissions"}
				>
					Submissions
				</NavLink>

			</div>
			<Suspense fallback={<ProblemStatementSkeleton />}>
				<Outlet />
			</Suspense>
		</section>
	);
};
