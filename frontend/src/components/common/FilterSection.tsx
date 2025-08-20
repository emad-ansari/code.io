import { memo, useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { Search, X } from "lucide-react";

import { useAppDispatch } from "@/app/store";
import { fetchProblems } from "@/features/problemSlice";
import { DropDownMenu } from "@/components/ui/DropDownMenu";
import { DIFFICULTY, STATUS } from "@/lib/types";

export interface AppliedFilter {
	filterType: "difficulty" | "status";
	filterOption: string;
}

export const FilterSection = memo(() => {
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const { category } = useParams();
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [filters, setFilters] = useState<AppliedFilter[]>([]);

	// Re-store the filter from url if exist and display it on ui 
	useEffect(() => {
		const newFilters: AppliedFilter[] = [];
		// check supported filters
		const difficulty = searchParams.get("difficulty");
		const status = searchParams.get("status");

		if (difficulty)
			newFilters.push({
				filterType: "difficulty",
				filterOption: difficulty,
			});
		if (status)
			newFilters.push({ filterType: "status", filterOption: status });

		setFilters(newFilters); 
	}, [searchParams]);


	useEffect(() => {
		if (searchQuery === "") {
			searchParams.delete("search");
		} else {
			searchParams.set("search", searchQuery);
		}
		setSearchParams(searchParams);
		dispatch(
			fetchProblems({
				categoryName: category ? category : "math",
				pageNumber: Number(searchParams.get("page")) || 1,
				difficulty: searchParams.get("difficulty") || "",
				status: searchParams.get("status") || "",
				searchKeywords: searchParams.get("search") || "",
			})
		);
	}, [searchQuery, dispatch]);

	const onSelectFilter = ({ filterType, filterOption }: AppliedFilter) => {
		// add to URL
		searchParams.set(filterType, filterOption);
		setSearchParams(searchParams);
		// add to UI
		// check if filter already exist then update it with new option
		const isFilterExist = filters.find(
			(filter) => filter.filterType == filterType
		);
		if (isFilterExist) {
			// then update the exiting option with new opiton
			const updatedFilters = filters.map((filter) =>
				filter.filterType == filterType
					? { ...filter, filterOption: filterOption }
					: filter
			);
			setFilters(updatedFilters);
		} else {
			// add the new filter
			setFilters((prevFilter) => [
				...prevFilter,
				{ filterType, filterOption },
			]);
		}
		dispatch(
			fetchProblems({
				categoryName: category ? category : "math",
				pageNumber: Number(searchParams.get("page")) || 1,
				difficulty: searchParams.get("difficulty") || "",
				status: searchParams.get("status") || "",
				searchKeywords: searchParams.get("search") || "",
			})
		);
	};

	const onRemoveFilter = (filterType: string) => {
		// remove from UI
		setFilters((prevFilters) =>
			prevFilters.filter((filter) => filter.filterType !== filterType)
		);

		// remove from url
		if (filterType === "difficulty") {
			searchParams.delete("difficulty");
		} else {
			searchParams.delete("status");
		}

		setSearchParams(searchParams);

		// get the problem list with eixsting filters
		dispatch(
			fetchProblems({
				categoryName: category ? category : "math",
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
					{category && category.trim().charAt(0).toUpperCase() + category.trim().slice(1)}
					<span className="text-[#eb8069]">Challenges</span>
				</h2>
				<div className="flex space-x-5">
					<DropDownMenu
						className="bg-code-bg w-32 h-10 text-md  border-[1.5px] border-slate-800"
						placeholder="Difficulty"
						filterOptions={DIFFICULTY}
						filterType={"difficulty"}
						onSelect={onSelectFilter}
					/>
					<DropDownMenu
						className="bg-code-bg w-32 h-10 text-md border-[1.5px] border-slate-800"
						placeholder="Status"
						filterOptions={STATUS}
						filterType={"status"}
						onSelect={onSelectFilter}
					/>
				</div>
			</div>
			<div className="relative flex-1 text-white shadow-inner mt-8 ">
				<Search
					strokeWidth={1.25}
					className="absolute top-1/4 left-3 w-5 h-5"
				/>
				<input
					type="text"
					className="bg-code-bg rounded-full outline-none px-10 py-2.5 text-sm w-full placeholder-[#484848] duration-300 hover:shadow-md hover:shadow-gray-600 transition  border-[1.5px] border-slate-800 "
					placeholder="Filter problems..."
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
			<div className="flex flex-row gap-3 mt-3">
				{filters.map((filter) => {
					return (
						<div
							key={filter.filterType}
							className="bg-slate-800 rounded-full px-3 py-2	 text-xs flex gap-3 text-white items-center font-medium cursor-pointer "
						>
							<span>{filter.filterOption}</span>
							<span
								className="bg-slate-700  w-4 h-4 rounded-full flex items-center justify-center"
								onClick={() =>
									onRemoveFilter(filter.filterType)
								}
							>
								<X className="w-3 h-3 rounded-full" />
							</span>
						</div>
					);
				})}
			</div>
		</nav>
	);
});
