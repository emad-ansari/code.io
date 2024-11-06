import { memo, useEffect, Suspense } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
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

const ProblemsetPage = () => {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

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

	return (
		<div
			className=" flex flex-col gap-8  bg-PRIMARY items-center pb-20 mt-[63px] fixed top-0 bottom-0 left-0 right-0"
			onClick={(e: React.SyntheticEvent<EventTarget>) =>
				handleDropDown(e)
			}
		>
			<div className="flex flex-col gap-8 items-center pt-10 pb-10 w-full  overflow-y-scroll fixed top-0  left-0 right-0 bottom-0 mt-[64px]">
				<div className="flex flex-col gap-8 w-[900px] ">
					<FilterSection />
					<div className="flex items-center ">
						<span className="flex-none [font-family: Inter] font-mono text-white w-36 px-3 ">
							Status
						</span>
						<span className="flex flex-1 text-white justify-start font-mono">
							Title
						</span>
						<span className="flex flex-1 text-white items-center font-mono justify-end pr-5">
							Difficulty
						</span>
					</div>
					<Suspense fallback={<ProblemListSkeleton />}>
						<Outlet />
					</Suspense>
				</div>
				<div className="flex items-center w-[900px] justify-between">
					<Select
						onValueChange={(value) => {
							const problemPerPage = Number(value.split(" ")[0]);
							dispatch(setPageSize(problemPerPage));
						}}
					>
						<SelectTrigger className="w-28 text-white border border-none bg-darkGray">
							<SelectValue
								placeholder="10 / page"
								className="text-white"
							/>
						</SelectTrigger>
						<SelectContent className="bg-darkGray text-white border border-BORDER">
							<SelectGroup className="">
								{problems_per_page.map((item, index) => {
									return (
										<SelectItem
											value={item}
											key={index}
											className="cursor-pointer"
										>
											{item}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
					<div className="flex flex-row justify-end">
						<CustomPagination />
					</div>
				</div>
			</div>
		</div>
	);
};

const CustomPagination = memo(() => {
	const { totalPages } = useSelector((state: RootState) => state.problem);
	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get("page")) || 1;

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={page > 1 ? `/problemset/?page=${page - 1}` : ""}
						className="bg-darkGray text-white hover:bg-gray-800 hover:text-white"
					/>
				</PaginationItem>
				{Array.from({ length: totalPages }).map((_, index) => (
					<PaginationItem key={index}>
						<PaginationLink
							href={`/problemset/?page=${index + 1}`}
							className={`text-white hover:bg-gray-800 hover:text-white ${
								page === index + 1
									? "bg-gray-800"
									: "bg-darkGray"
							}`}
						>
							{index + 1}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationEllipsis className=" text-white " />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext
						href={
							page > totalPages - 1
								? ""
								: `/problemset/?page=${page + 1}`
						}
						className="bg-darkGray text-white hover:bg-gray-800 hover:text-white"
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
});

export default ProblemsetPage;
