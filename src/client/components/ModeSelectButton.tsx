import { MdKeyboardArrowDown} from "react-icons/md";
import { LanguageDropDownMenu } from "./LanguageDropDownMenu";
import { RootState, useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import { setOpenDropDownMenu } from "../features/problemSlice";
import { Button } from "./Button";
import { memo } from 'react'


export const ModeSelectButton = memo(() => {
    const { openDropDownMenu , selectedLanguage} = useSelector((state: RootState) => state.problem);
    const dispatch = useAppDispatch();
  
  return (
    <Button
      classname="relative flex flex-row items-center gap-2 bg-[#48445c] text-white z-30"
      onClick={() => dispatch(setOpenDropDownMenu({ menu: "languages" }))}
    >
      <span>{selectedLanguage}</span>
      <MdKeyboardArrowDown
        className={`text-2xl pt-1 ${
          openDropDownMenu.isLanguageMenuOpen
            ? " transform duration-200  rotate-180 pt-1"
            : "transform duration-200  -rotate-0 pt-1"
        }`}
      />
      <LanguageDropDownMenu />
    </Button>
  );
});
