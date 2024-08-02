import { ProblemList } from "../components/ProblemList";
import { FilterSection } from "../components/FilterSection";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { problems } from "./problems";
import { MAX_PROBLEM_LIMIT } from "../types";
import { useMemo } from "react";
import {
	setPaginationCount,
	setProblemSet,
	setOpenDropDownMenu,
} from "../features/problemSlice";

export const ProblemsetPage = () => {
	const dispatch = useAppDispatch();
	const { pagination, openDropDownMenu } = useSelector(
		(state: RootState) => state.problem
	);
	// claculate the number of pagination
	useMemo(() => {
		const numberOfPagination = Math.ceil(
			problems.length / MAX_PROBLEM_LIMIT
		);
		dispatch(
			setPaginationCount({
				...pagination,
				paginationCount: numberOfPagination,
			})
		);

		// filter the problem over here
		dispatch(setProblemSet(1));
	}, [problems]);

	return (
		<div
			className=" flex flex-col gap-8 h-screen overflow-scroll items-center  pb-20"
			onClick={() => {
				if (openDropDownMenu.isDifficultyMenuOpen) {
					dispatch(
						setOpenDropDownMenu({
							menu: "difficulty",
						})
					);
				} else if (openDropDownMenu.isStatusMenuOpen) {
					dispatch(
						setOpenDropDownMenu({
							menu: "status",
						})
					);
				}
			}}
		>
			<div className="flex flex-col gap-8 pt-10 w-[900px]">
				<FilterSection />
				<div className="flex items-cente ">
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
				<div className="flex flex-col gap-2">
					<ProblemList />
				</div>
			</div>
			<Pagination
				count={pagination.paginationCount}
				variant="outlined"
				sx={{
					"& .MuiPaginationItem-root": {
						backgroundColor: "#2B2A2B",
						color: "#fff", // Change the text color if needed
						"&:hover": {
							backgroundColor: "#0c8a45", // Change the background color on hover
						},
						"&.Mui-selected": {
							backgroundColor: "#0FA958", // Change the background color of the selected item
							color: "#fff",
							"&:hover": {
								backgroundColor: "#0c8a45", // Change the background color on hover for the selected item
							},
						},
					},
				}}
				onChange={(_, value) => {
					dispatch(setProblemSet(value));
				}}
			/>
		</div>
	);
};
