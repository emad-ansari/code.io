import { memo, useEffect, Suspense } from "react";
import { Outlet, useSearchParams, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "@/client/app/store";
import { setOpenDropDownMenu } from "@/client/features/dropDownSlice";
import { fetchProblem, setPageSize } from "@/client/features/problemSlice";
import { FilterSection } from "@/client/components/common/FilterSection";
import { ProblemListSkeleton } from "@/client/components/skeletons/ProblemListSkeleton";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/client/components/ui/pagination";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/client/components/ui/select";

import { problems_per_page } from "@/client/lib/types";
import { cn } from "@/client/lib/utils";

const ProblemsetPage = () => {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const { type } = useParams();

	const { isDifficultyMenuOpen, isStatusMenuOpen } = useSelector(
		(state: RootState) => state.dropdown
	);

	useEffect(() => {
		dispatch(
			fetchProblem({
				pageNumber: Number(searchParams.get("page")) || 1,
				difficulty: searchParams.get("difficulty") || "",
				status: searchParams.get("status") || "",
				searchKeywords: searchParams.get("search") || "",
			})
		);
	}, []);

	const handleDropDown = (e: React.SyntheticEvent<EventTarget>) => {
		if (e.target !== e.currentTarget) return;

		if (isDifficultyMenuOpen) {
			dispatch(
				setOpenDropDownMenu({
					menu: "difficulty",
				})
			);
		} else if (isStatusMenuOpen) {
			dispatch(
				setOpenDropDownMenu({
					menu: "status",
				})
			);
		}
	};

	const onProblemPerPageChange = (value: string) => {
		const problemPerPage = Number(value.split(" ")[0]);
		dispatch(setPageSize(problemPerPage));
	};

	return (
		<div
			className=" flex flex-col gap-8 bg-code-bg items-center pt-16 justify-center h-screen"
			onClick={(e: React.SyntheticEvent<EventTarget>) =>
				handleDropDown(e)
			}
		>
			<div className="flex flex-col gap-8 items-center pt-20 px-6 md:px-44 w-full h bg-code-bg">
				<div className="flex flex-col gap-8 w-full ">
					<FilterSection />
					<Suspense fallback={<ProblemListSkeleton />}>
						<Outlet />
					</Suspense>
					<div className="flex items-center w-full justify-between ">
						<Select onValueChange={onProblemPerPageChange}>
							<SelectTrigger
								className={cn(
									"text-white",
									"bg-code-bg w-36 h-10 border border-code-border"
								)}
							>
								<SelectValue
									placeholder="10 / page"
									className="text-white"
								/>
							</SelectTrigger>
							<SelectContent
								className={cn(
									"bg-code-bg text-white border-[1.5px] border-slate-800"
								)}
							>
								<SelectGroup>
									{problems_per_page &&
										problems_per_page.map(
											(option, index) => {
												return (
													<SelectItem
														value={option}
														key={index}
														className={cn(
															"cursor-pointer"
														)}
													>
														{option}
													</SelectItem>
												);
											}
										)}
								</SelectGroup>
							</SelectContent>
						</Select>
						<div className="flex flex-row justify-end">
							<CustomPagination />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const CustomPagination = memo(() => {
	const { totalPages } = useSelector((state: RootState) => state.problem);
	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get("page")) || 1;

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={page > 1 ? `/problemset/?page=${page - 1}` : ""}
						className="bg-code-bg text-white hover:bg-code-hover hover:text-white border border-code-border"
					/>
				</PaginationItem>
				{Array.from({ length: totalPages }).map((_, index) => (
					<PaginationItem key={index}>
						<PaginationLink
							href={`/problemset/?page=${index + 1}`}
							className={`text-white hover:bg-code-bg hover:text-white border border-code-border ${
								page === index + 1
									? "bg-gray-800"
									: "bg-darkGray"
							}`}
						>
							{index + 1}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem className="hidden md:block">
					<PaginationEllipsis className=" text-white " />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext
						href={
							page > totalPages - 1
								? ""
								: `/problemset/?page=${page + 1}`
						}
						className="bg-code-bg text-white hover:bg-gray-700 hover:text-white border border-code-border"
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
});

export default ProblemsetPage;
