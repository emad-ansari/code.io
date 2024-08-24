import { MdKeyboardArrowDown } from "react-icons/md";
import { useAppDispatch } from "../app/store";
import { setOpenDropDownMenu } from "../features/dropDownSlice";
import { setLanguage } from "../features/editorSlice";
import { Button } from "./Button";
import { IoIosCheckmark } from "react-icons/io";
import { memo } from "react";

interface ModeSelectButtonProps {
	menuType: string;
	ITEMS_ARRAY: string[];
	isMenuOpen: boolean;
	selectedItem: string;
}

export const ModeSelectButton = memo(({ menuType, ITEMS_ARRAY, isMenuOpen, selectedItem }: ModeSelectButtonProps) => {
		
		const dispatch = useAppDispatch();

		return (
			<Button
				classname="relative flex flex-row items-center gap-2 bg-gray-700 text-white z-30 rounded-md"
				onClick={() =>
					dispatch(setOpenDropDownMenu({ menu: menuType }))
				}
			>
				<span className="text-sm">{selectedItem}</span>
				<MdKeyboardArrowDown
					className={`text-2xl pt-1 ${
						isMenuOpen
							? " transform duration-200  rotate-180 pt-1"
							: "transform duration-200  -rotate-0 pt-1"
					}`}
				/>
				<div
					className={`flex flex-col bg-darkGray absolute bottom-0 left-0 right-[-20%] top-[110%] h-[195px] items-center rounded-lg py-2 z-10 shadow-md text-sm ${
						isMenuOpen
							? "transform translate-y-0 opacity-100 block"
							: "translate-y-[-50%] opacity-0 hidden"
					} ease-in-out duration-300`}
				>
					{ITEMS_ARRAY.map((item, index) => {
						return (
							<span
								key={index}
								className="text-white font-normal hover:bg-hover flex  items-center px-2 py-2 w-[90%] rounded-md h-full justify-between"
								onClick={() =>
									dispatch(setLanguage(item))
								}
							>
								{item}
								{ item === selectedItem && <IoIosCheckmark className="text-2xl font-medium"/> }
							</span>
						);
					})}
				</div>
			</Button>
		);
	}
);
