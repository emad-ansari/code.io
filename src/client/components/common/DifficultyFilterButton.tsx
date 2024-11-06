import { Button } from "../common/Button";
import { DifficultyDropDownMenu } from "../common/DifficultyDroptDownMenu";
import { ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { setOpenDropDownMenu } from "../../features/dropDownSlice";
import { memo } from "react";

export const DifficultyFitlerButton = memo(() => {
	const dispatch = useAppDispatch();
	const { isDifficultyMenuOpen } = useSelector(
		(state: RootState) => state.dropdown
	);

	return (
		<Button
			classname=" relative flex flex-row itmes-center  gap-2 text-gray-200  z-50 rounded-md border-2 border-BORDER"
			onClick={() => {
				dispatch(setOpenDropDownMenu({ menu: "difficulty" }));
			}}
		>
			<span>Difficulty</span>
			<ChevronDown
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
