import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";

import { useAppDispatch } from "@/client/app/store";
import { fetchProblem } from "@/client/features/problemSlice";
import { DropDownMenu } from "@/client/components/ui/DropDownMenu";
import { DIFFICULTY, STATUS } from "@/client/lib/types";

interface FiltersApplied {
	filterType: "difficulty" | "status";
	filterName: string;
}

export const FilterSection = memo(() => {
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [filtersApplied, setFiltersApplied] = useState<FiltersApplied[]>([]);

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
		
		const isFilterExist = filtersApplied.find(
			(filters) => filters.filterType === "difficulty"
		);
		if (isFilterExist) {
			// then iterate over the filters and just update that one
			const updatedFilters = filtersApplied.map((filter) =>
				filter.filterType === "difficulty"
					? { ...filter, filterName: difficultyLevel }
					: filter
			);
			setFiltersApplied(updatedFilters);
		} else {
			setFiltersApplied((prevFilters) => [
				...prevFilters,
				{ filterType: "difficulty", filterName: difficultyLevel },
			]);
		}
		
		
		if (searchParams.get("difficulty") === difficultyLevel) {
			searchParams.delete("difficulty"); // remove it from url
		} else {
			console.log("going to add the filter options");
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

	const onRemoveFilter = (filterType: string) => {
		// remove from UI
		setFiltersApplied(prevFilters => prevFilters.filter(filter => filter.filterType !== filterType));
		
		// remove from url 
		if (filterType === 'difficulty') {
			searchParams.delete("difficulty");
		}
		else {
			searchParams.delete('status');
		}
		
		setSearchParams(searchParams);
		
		// get the problem list with eixsting filters
		dispatch(
			fetchProblem({
				pageNumber: Number(searchParams.get("page")) || 1,
				difficulty:  searchParams.get("difficulty") || "",
				status: searchParams.get("status") || "",
				searchKeywords: searchParams.get("search") || "",
			})
		);
	}

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
				{filtersApplied.map((filter) => {
					return (
						<div
							key={filter.filterType}
							className="bg-slate-800 rounded-full px-3 py-2	 text-xs flex gap-3 text-white items-center font-medium cursor-pointer "
						>
							<span>{filter.filterName}</span>
							<span 
								className="bg-slate-700  w-4 h-4 rounded-full flex items-center justify-center"
								onClick={() => onRemoveFilter(filter.filterType)}
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
