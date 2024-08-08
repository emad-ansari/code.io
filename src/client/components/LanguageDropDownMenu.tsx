import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { setSelectedLanguage } from "../features/problemSlice";

const LANGUAGES = ["java", "cpp", "javascript", "go", 'rust'];

export const LanguageDropDownMenu = () => {
  const { openDropDownMenu } = useSelector((state: RootState) => state.dropdown);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`flex flex-col bg-darkGray absolute bottom-0 left-0 right-[-20%] top-[110%] h-[195px] items-center rounded-lg py-2 z-10 shadow-md text-sm ${
        openDropDownMenu.isLanguageMenuOpen
          ? "transform translate-y-0 opacity-100 block"
          : "translate-y-[-50%] opacity-0 hidden"
      } ease-in-out duration-300`}
    >
      {LANGUAGES.map((mode, index) => {
        return (
          <span key = {index} className="text-white font-normal hover:bg-hover flex  items-center px-2 py-2 w-[90%] rounded-md h-full" onClick = {() => dispatch(setSelectedLanguage(mode))}
          >
            {mode}
          </span>
        );
      })}
    </div>
  );
};
