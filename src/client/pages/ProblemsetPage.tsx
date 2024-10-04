import { FilterSection } from "../components/common/FilterSection";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../components/ui/pagination";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { memo, useEffect, Suspense } from "react";
import { setOpenDropDownMenu } from "../features/dropDownSlice";
import { getProblems } from "../features/problemSlice";
import { Outlet, useSearchParams } from "react-router-dom";
import { ProblemListSkeleton } from "../components/skeletons/ProblemListSkeleton";

const ProblemsetPage = () => {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

	const { isDifficultyMenuOpen, isStatusMenuOpen } = useSelector(
		(state: RootState) => state.dropdown
	);

	useEffect(() => {
		dispatch(
			getProblems({
				pageNumber: Number(searchParams.get("page")) || 1,
				difficulty: searchParams.get("difficulty") || "",
				status: searchParams.get("status") || "",
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
			<div className="flex flex-col gap-8 items-center pt-10 pb-10 w-full  overflow-y-scroll fixed top-0  left-0 right-0 bottom-0 mt-[64px] ">
				<div className="flex flex-col gap-8 w-[900px]">
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
				<CustomPagination />
			</div>
		</div>
	);
};

const CustomPagination = memo(() => {
	const { totalPages } = useSelector((state: RootState) => state.problem);

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href="#"
						className="bg-darkGray text-white "
					/>
				</PaginationItem>
				{Array.from({ length: totalPages }).map((_, index) => (
					<PaginationItem key = {index}>
						<PaginationLink
							href={`/problemset/?page=${index + 1}`}
							className="bg-darkGray text-white "
							// isActive
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
						href="#"
						className="bg-darkGray text-white "
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
});

export default ProblemsetPage;
