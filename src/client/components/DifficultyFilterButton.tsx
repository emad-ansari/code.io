import { Button } from "../components/Button";
import { DifficultyDropDownMenu } from "../components/DifficultyDroptDownMenu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { setOpenDropDownMenu } from "../features/dropDownSlice";
import { memo } from "react";

export const DifficultyFitlerButton = memo(() => {
	const dispatch = useAppDispatch();
	const { isDifficultyMenuOpen } = useSelector((state: RootState) => state.dropdown);

	return (
		<Button
			classname="bg-darkGray relative flex flex-row itmes-center  gap-2 text-white shadow-inner hover:bg-hover z-50 rounded-md"
			onClick={() => {
				dispatch(setOpenDropDownMenu({ menu: "difficulty" }));
			}}
		>
			<span>Difficulty</span>
			<MdKeyboardArrowDown
				className={`text-2xl pt-1 ${
					isDifficultyMenuOpen
						? " transform duration-200  rotate-180 pt-1"
						: "transform duration-200  -rotate-0 pt-1"
				}`}
			/>
			<DifficultyDropDownMenu />
		</Button>
	);
});
