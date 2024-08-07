import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { useSearchParams } from "react-router-dom";
import { filterProblems } from "../features/problemSlice";

export const DifficultyDropDownMenu = () => {
	const dispatch = useAppDispatch();
	const { openDropDownMenu } = useSelector(
		(state: RootState) => state.dropdown
	);
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPageNumber = searchParams.get("page");

	return (
		<div
			className={`flex flex-col bg-darkGray absolute bottom-0 left-0 right-0 top-[110%] h-[125px] items-center rounded-lg py-2 z-10 shadow-md text-sm ${
				openDropDownMenu.isDifficultyMenuOpen
					? "transform translate-y-0 "
					: "translate-y-[-50%]  hidden"
			} ease-in-out duration-300`}
		>
			<span
				className="text-[#0FA958]   font-normal hover:bg-hover flex items-center px-2 py-2 w-[90%] rounded-md"
				onClick={() => {
					setSearchParams({
						page:
							currentPageNumber !== null
								? currentPageNumber
								: "1",
						difficulty: "Easy",
					});
					dispatch(
						filterProblems({
							pageNumber:
								currentPageNumber !== null
									? Number(currentPageNumber)
									: 1,
							difficultyLevel: "Easy",
						})
					);
				}}
			>
				Easy
			</span>
			<span
				className="text-[#dadd32]  font-normal hover:bg-hover flex  items-center px-2 py-2 w-[90%] rounded-md "
				onClick={() => {
					setSearchParams({
						page:
							currentPageNumber !== null
								? currentPageNumber
								: "1",
						difficulty: "Medium",
					});
					dispatch(
						filterProblems({
							pageNumber:
								currentPageNumber !== null
									? Number(currentPageNumber)
									: 1,
							difficultyLevel: "Medium",
						})
					)
				}}

			>
				Medium
			</span>
			<span
				className="text-[#D91111]  font-normal hover:bg-hover flex  items-center px-2 py-2 w-[90%] rounded-md "
				onClick={() => {
					setSearchParams({
						page:
							currentPageNumber !== null
								? currentPageNumber
								: "1",
						difficulty: "Hard",
					});
					dispatch(
						filterProblems({
							pageNumber:
								currentPageNumber !== null
									? Number(currentPageNumber)
									: 1,
							difficultyLevel: "Hard",
						})
					)
				}}
			>
				Hard
			</span>
		</div>
	);
};
//
