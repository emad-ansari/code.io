import { IoIosCheckmark } from "react-icons/io";
import { useState} from 'react';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { useSearchParams } from "react-router-dom";
import { getProblems } from "../features/problemSlice";
import { IconType } from "react-icons";

export const DifficultyDropDownMenu = () => {
	const dispatch = useAppDispatch();
	const { isDifficultyMenuOpen } = useSelector(
		(state: RootState) => state.dropdown
	);
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPageNumber = searchParams.get("page");
	
	const [filterOption, setFilterOption] = useState<filterOptionType>({
		easy: false,
		medium: false,
		hard: false
	});

	const filterProblems = ( difficultyLevel: string, isFilterApply: boolean ) => {
		const option: string = difficultyLevel.toLocaleLowerCase();
		setFilterOption(prevOptionValue => {
			return {...prevOptionValue, [option]: option ==='easy' ? !prevOptionValue.easy : option == 'medium' ? !prevOptionValue.medium : !prevOptionValue.hard }
		});

		setSearchParams({
			page: currentPageNumber !== null ? currentPageNumber : "1",
			difficulty: difficultyLevel,
		});

		dispatch(
			getProblems({
				pageNumber: currentPageNumber !== null ? Number(currentPageNumber) : 1,
				difficultyLevel
			})
		);
	};

	return (
		<div
			className={`flex flex-col bg-darkGray absolute bottom-0 left-0 right-0 top-[110%] h-[125px] items-center rounded-lg py-2 z-10 shadow-md text-sm ${
				isDifficultyMenuOpen ? "block" : "hidden"
			}`}
		>
			<DropDownItem value = {"Easy"} filterProblems={filterProblems} isFilterApply = {filterOption.easy}/> 
			<DropDownItem value = {"Medium"} filterProblems={filterProblems} isFilterApply = {filterOption.medium}/> 
			<DropDownItem value = {"Hard"} filterProblems={filterProblems} isFilterApply = {filterOption.hard}/> 
		</div>
	);
};

interface DropDownItemProps {
	value: string;
	isFilterApply: boolean;
	filterProblems: (difficultyLevel: string, isfilterApply: boolean) => void;
	icons?: IconType; // for future use
}
interface filterOptionType {
	easy: boolean;
	medium: boolean;
	hard: boolean
}

function DropDownItem({value, filterProblems, isFilterApply}: DropDownItemProps) {
	
	return (
		<span
			className="text-[#0FA958] font-normal hover:bg-hover flex items-center px-2 py-2 w-[90%] rounded-md justify-between"
			onClick={() => {
				filterProblems(value, isFilterApply);
			}}
		>
			<span className= {`${value === "Easy" ? 'text-GREEN' : value === "Medium" ? 'text-YELLOW': "text-RED"}`}>{value}</span>
			{ isFilterApply ? <IoIosCheckmark /> : null } 
		</span>
	);
}
