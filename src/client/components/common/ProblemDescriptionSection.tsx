import { Button } from "./Button";
import { useNavigate, Outlet } from "react-router-dom";
import { Suspense } from "react";

import { ProblemStatementSkeleton } from "../skeletons/ProblemStatementSkeleton";

export const ProblemDescriptionSection = () => {
	const navigate = useNavigate();

	return (
		<section className="rounded-lg bg-code-bg text-white  border-[1.5px] border-code-border ">
			<div className="flex items-center bg-code-bg px-2 py-1 rounded-tl-lg rounded-tr-lg gap-5  border border-b-[#334155] border-t-transparent border-l-transparent border-r-transparent">
				<Button
					classname="hover:bg-gray-800 text-white rounded-md"
					onClick={() => navigate("./description")}
				>
					<span>Description</span>
				</Button>

				<Button
					classname="hover:bg-gray-800 text-white rounded-md"
					onClick={() => navigate("submissions")}
				>
					<span>Submissons</span>
				</Button>
			</div>
			<Suspense fallback={<ProblemStatementSkeleton />}>
				<Outlet />
			</Suspense>
		</section>
	);
};
