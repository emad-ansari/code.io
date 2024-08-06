import { ProblemList } from "../components/ProblemList";
import { FilterSection } from "../components/FilterSection";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import {  memo, useEffect } from "react";
import { setOpenDropDownMenu } from "../features/dropDownSlice";
import { getTotalPageNumber, getProblems } from "../features/problemSlice";
import { useNavigate, Outlet, useSearchParams } from "react-router-dom";

export const ProblemsetPage = () => {
	const dispatch = useAppDispatch();

	const { openDropDownMenu } = useSelector(
		(state: RootState) => state.dropdown
	);

	const handleDropDown = (e: React.SyntheticEvent<EventTarget>) => {
		// Todo - this event shouldn't be fire when clicking on button
		// how can i make sure that clicking on button doesn't fire the event of page
		if (e.target !== e.currentTarget) return;

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
	};

	return (
		<div
			className=" flex flex-col gap-8 h-screen overflow-scroll items-center  pb-20 bg-PRIMARY"
			onClick={(e: React.SyntheticEvent<EventTarget>) =>
				handleDropDown(e)
			}
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
				<Outlet />
			</div>
			<CustomPagination />
		</div>
	);
};

const CustomPagination = memo(() => {
	const dispatch = useAppDispatch();
	const { numberOfPages } = useSelector((state: RootState) => state.problem);
	const [_, setSearchParams] = useSearchParams();

	useEffect(() => {
		dispatch(getTotalPageNumber());
	}, [])

	return (
		<Pagination
			count={numberOfPages}
			variant="outlined"
			sx={{
				"& .MuiPaginationItem-root": {
					backgroundColor: "#0D1621",
					color: "#fff", // Change the text color if needed
					"&:hover": {
						backgroundColor: "#334155", // Change the background color on hover
					},
					"&.Mui-selected": {
						backgroundColor: "#334155", // Change the background color of the selected item
						color: "#fff",
						"&:hover": {
							backgroundColor: "#334155", // Change the background color on hover for the selected item
						},
					},
				},
			}}
			onChange={(_, value) => {
				setSearchParams({page: value.toString()})
				dispatch(getProblems(value));
			}}
		/>
	);
});
