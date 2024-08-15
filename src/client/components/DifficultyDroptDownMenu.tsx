import { IoIosCheckmark } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { setFilterOptions } from "../features/filterSlice";
import { useSearchParams } from "react-router-dom";
import { getProblems } from "../features/problemSlice";
import { IconType } from "react-icons";

export const DifficultyDropDownMenu = () => {
	const dispatch = useAppDispatch();
	const { isDifficultyMenuOpen } = useSelector(
		(state: RootState) => state.dropdown
	);
	const { easy, medium, hard} = useSelector((state: RootState) => state.filter);
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPageNumber = searchParams.get("page");
	console.log(easy, medium , hard);

	const filterProblems = ( difficultyLevel: string, isFilterApply: boolean ) => {
		// const option: string = difficultyLevel.toLocaleLowerCase();
		
		console.log('checking whehter the filter is apply or not: ', isFilterApply);
		setSearchParams({
			page: currentPageNumber !== null ? currentPageNumber : "1",
			difficulty: isFilterApply ? difficultyLevel: "",
		});

		dispatch(
			getProblems({
				pageNumber: currentPageNumber !== null ? Number(currentPageNumber) : 1,
				difficultyLevel: isFilterApply ? difficultyLevel : ""
			})
		);
	};

	return (
		<div
			className={`flex flex-col bg-darkGray absolute bottom-0 left-0 right-0 top-[110%] h-[125px] items-center rounded-lg py-2 z-10 shadow-md text-sm ${
				isDifficultyMenuOpen ? "block" : "hidden"
			}`}
		>
			<DropDownItem value = {"Easy"} filterProblems={filterProblems} isFilterApply = {easy}/> 
			<DropDownItem value = {"Medium"} filterProblems={filterProblems} isFilterApply = {medium}/> 
			<DropDownItem value = {"Hard"} filterProblems={filterProblems} isFilterApply = {hard}/> 
		</div>
	);
};

interface DropDownItemProps {
	value: string;
	isFilterApply: boolean;
	filterProblems: (difficultyLevel: string, isfilterApply: boolean) => void;
	icons?: IconType; // for future use
}

function DropDownItem({value, filterProblems, isFilterApply}: DropDownItemProps) {
	const dispatch = useAppDispatch();
	return (
		<span
			className="text-[#0FA958] font-normal hover:bg-hover flex items-center px-2 py-2 w-[90%] rounded-md justify-between"
			onClick={() => {
				dispatch(setFilterOptions({option: value.toLocaleLowerCase()}));
				filterProblems(value, isFilterApply);
			}}
		>
			<span className= {`${value === "Easy" ? 'text-GREEN' : value === "Medium" ? 'text-YELLOW': "text-RED"}`}>{value}</span>
			{ isFilterApply ? <IoIosCheckmark /> : null } 
		</span>
	);
}
