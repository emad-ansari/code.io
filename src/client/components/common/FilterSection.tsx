import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from 'lucide-react'

import { useAppDispatch } from "@/client/app/store";
import { fetchProblem } from "@/client/features/problemSlice";
import { DropDownMenu } from "@/client/components/ui/DropDownMenu";
import { DIFFICULTY, STATUS } from "@/client/lib/types";

export const FilterSection = memo(() => {
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchQuery, setSearchQuery] = useState<string>("");

	useEffect(() => {
		if (searchQuery === "") {
			searchParams.delete("search");
		} else {
			searchParams.set("search", searchQuery);
		}
		setSearchParams(searchParams);
		dispatch(
			fetchProblem({
				pageNumber: Number(searchParams.get("page")) || 1,
				difficulty: searchParams.get("difficulty") || "",
				status: searchParams.get("status") || "",
				searchKeywords: searchParams.get("search") || "",
			})
		);
	}, [searchQuery, dispatch]);

	const filterProblems = (difficultyLevel: string) => {
		if (searchParams.get("difficulty") === difficultyLevel) {
			searchParams.delete("difficulty"); // remove it from url
		} else {
			searchParams.set("difficulty", difficultyLevel); // add it
		}
		setSearchParams(searchParams);
		dispatch(
			fetchProblem({
				pageNumber: Number(searchParams.get("page")) || 1,
				difficulty: searchParams.get("difficulty") || "",
				status: searchParams.get("status") || "",
				searchKeywords: searchParams.get("search") || "",
			})
		);
	};

	const handleStatusFilter = (currentFilterOption: string) => {
		if (searchParams.get("status") === currentFilterOption) {
			searchParams.delete("status"); // remove it from url
		} else {
			searchParams.set("status", currentFilterOption); // add it
		}
		setSearchParams(searchParams);

		dispatch(
			fetchProblem({
				pageNumber: Number(searchParams.get("page")) || 1,
				difficulty: searchParams.get("difficulty") || "",
				status: searchParams.get("status") || "",
				searchKeywords: searchParams.get("search") || "",
			})
		);
	};

	return (
		<nav className="flex-col  w-full z-0 ">
			<div className="flex flex-wrap gap-8 w-full items-center justify-between">
				<h2 className="text-4xl font-bold text-white flex items-center gap-3">
					Coding 
					<span className="text-[#eb8069]">Challenges</span>
					
				</h2>
				<div className="flex space-x-5">
					<DropDownMenu
						className="bg-code-bg w-32 h-10 text-md  border-[1.5px] border-slate-800"
						placeholder="Difficulty"
						items={DIFFICULTY}
						onValueChange={filterProblems}
					/>
					<DropDownMenu
						className="bg-code-bg w-32 h-10 text-md border-[1.5px] border-slate-800"
						placeholder="Status"
						items={STATUS}
						onValueChange={handleStatusFilter}
					/>
				</div>
			</div>
			<div className="relative flex-1 text-white shadow-inner mt-8 ">
				<Search strokeWidth={1.25} className="absolute top-1/4 left-3 w-5 h-5"/>
				<input
					type="text"
					className="bg-code-bg rounded-full outline-none px-10 py-2.5 text-sm w-full placeholder-[#484848] duration-300 hover:shadow-lg hover:shadow-gray-600 transition  border-[1.5px] border-slate-800 "
					placeholder="Filter problems..."
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
		</nav>
	);
});
