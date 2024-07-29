import { Button } from "../components/Button";
import { DifficultyDropDownMenu } from "../components/DifficultyDroptDownMenu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { setOpenDropDownMenu } from "../features/problemSlice";
import { memo } from 'react'


export const DifficultyFitlerButton = memo(() => {
    const dispatch = useAppDispatch();
    const { openDropDownMenu } = useSelector((state: RootState) => state.problem);
  
    return (
        <Button
        classname=" relative flex flex-row itmes-center bg-[#2B2A2B] gap-2 text-white shadow-inner hover:bg-[#403c3c] z-50"
        onClick={() => dispatch(setOpenDropDownMenu({menu: "difficulty"}))}
      >
        <span>Difficulty</span>
        <MdKeyboardArrowDown
          className={`text-2xl pt-1 ${
            openDropDownMenu.isDifficultyMenuOpen
              ? " transform duration-200  rotate-180 pt-1"
              : "transform duration-200  -rotate-0 pt-1"
          }`}
        />
        <DifficultyDropDownMenu />
      </Button>
    )
})
