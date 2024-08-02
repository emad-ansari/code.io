import { Button } from "../components/Button";
import { StatusDropDownMenu } from "../components/StatusDropDownMenu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { setOpenDropDownMenu } from "../features/problemFilterSlice";
import { memo } from "react";

export const StatusFilterButton = memo(() => {
	const dispatch = useAppDispatch();
	const { openDropDownMenu } = useSelector(
		(state: RootState) => state.filter
	);

	return (
		<Button
			classname="relative flex flex-row itmes-center bg-[#2B2A2B] gap-2 text-white hover:bg-[#403c3c] z-50"
			onClick={(e: React.SyntheticEvent<EventTarget> ) => {
        e.stopPropagation();
				dispatch(setOpenDropDownMenu({ menu: "status" }));
			}}
		>
			<span className="z-50">Status</span>
			<MdKeyboardArrowDown
				className={`text-2xl pt-1 z-50 ${
					openDropDownMenu.isStatusMenuOpen
						? " transform duration-200  rotate-180 pt-1"
						: "transform duration-200  -rotate-0 pt-1"
				}`}
			/>
			<StatusDropDownMenu />
		</Button>
	);
});
