import { StatusFilterButton } from "./StatusFilterButton";
import { DifficultyFitlerButton } from "./DifficultyFilterButton";
import { IoSearchOutline } from "react-icons/io5";
import { memo, useEffect, useState } from "react";
import { getProblems } from "@/client/features/problemSlice";
import { useAppDispatch } from "@/client/app/store";
import { useSearchParams } from "react-router-dom";

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
			getProblems({
				pageNumber: Number(searchParams.get("page")) || 1,
				difficulty: searchParams.get("difficulty") || "",
				status: searchParams.get("status") || "",
				searchKeywords: searchParams.get("search") || "",
			})
		);
	}, [searchQuery, dispatch]);

	return (
		<nav className="flex flex-row gap-10 w-full z-0 ">
			<DifficultyFitlerButton />
			<StatusFilterButton />
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
