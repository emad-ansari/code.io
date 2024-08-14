import { IoIosCheckmark } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { useSearchParams } from "react-router-dom";
import { getProblems } from "../features/problemSlice";


export const DifficultyDropDownMenu = () => {
	const dispatch = useAppDispatch();
	const { isDifficultyMenuOpen } = useSelector((state: RootState) => state.dropdown);
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPageNumber = searchParams.get("page");
	
	const filterProblems = (difficultyLevel: string) => {
		setSearchParams({
			page: currentPageNumber !== null ? currentPageNumber : "1",
			difficulty: difficultyLevel,
		});
		dispatch(
			getProblems({
				pageNumber: currentPageNumber !== null ? Number(currentPageNumber) : 1,
				difficultyLevel,
			})
		);
	}

	return (
		<div
			className={`flex flex-col bg-darkGray absolute bottom-0 left-0 right-0 top-[110%] h-[125px] items-center rounded-lg py-2 z-10 shadow-md text-sm ${isDifficultyMenuOpen ? "block" : 'hidden'}`}
		>
			<span
				className="text-[#0FA958]   font-normal hover:bg-hover flex items-center px-2 py-2 w-[90%] rounded-md"
				onClick={() => filterProblems("Easy")}
			>
				Easy
			</span>
			<span
				className="text-[#dadd32]  font-normal hover:bg-hover flex  items-center px-2 py-2 w-[90%] rounded-md "
				onClick={() => filterProblems("Medium")}
			>
				Medium
			</span>
			<span
				className="text-[#D91111]  font-normal hover:bg-hover flex  items-center px-2 py-2 w-[90%] rounded-md "
				onClick={() => filterProblems("Hard")}
			>
				Hard
			</span>
		</div>
	);
};
//
