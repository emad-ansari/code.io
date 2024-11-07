import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "@/client/app/store";
import { fetchProblem } from "@/client/features/problemSlice";
import { StatusFilterButton } from "./StatusFilterButton";
import { DifficultyFitlerButton } from "./DifficultyFilterButton";
import { DropDownMenu } from "@/client/components/ui/DropDownMenu";
import { IoSearchOutline } from "react-icons/io5";
import { DIFFICULTY, STATUS} from '@/client/lib/types'



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
		// setCurrentStatusOption(currentFilterOption);

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
		<nav className="flex flex-row gap-10 w-full z-0 ">
			<DropDownMenu 
				className="bg-darkGray"
				placeholder="Difficulty"
				items={DIFFICULTY}
				onValueChange = {filterProblems}
			/>
			<DropDownMenu 
				className="bg-darkGray"
				placeholder="Status"
				items={STATUS}
				onValueChange = {handleStatusFilter}
			/>
			{/* <StatusFilterButton /> */}
			<div className="relative flex flex-1 text-white shadow-inner ">
				<input
					type="text"
					className="bg-darkGray rounded-md outline-none px-10 text-sm w-full placeholder-[#484848] focus:ring ring-slate-800 border border-[#334155] "
					placeholder="Search by title..."
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<IoSearchOutline className="absolute top-1/3 left-3" />
			</div>
		</nav>
	);
});
