import { Button } from "../components/Button";
// import { MdOutlineFileUpload } from "react-icons/md";
import { ModeSelectButton } from "./ModeSelectButton";
import { CodeEditor } from "./CodeEditor";
import { IoSettings } from "react-icons/io5";
import { GoScreenFull } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";



const LANGUAGES = ["java", "cpp", "javascript", "go", 'rust'];
const EDITOR_THEMES = ["default", "GitHub Dark", "OneDark Pro"];

interface EditorSectionProps {
	setToggleFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditorSection = ({ setToggleFullScreen }: EditorSectionProps) => {
  const { isLanguageMenuOpen, isThemeMenuOpen, selectedLanguage, seletedTheme} = useSelector((state: RootState) => state.dropdown)
	return (
		<section className="flex flex-1  bg-darkGray  rounded-lg flex-col   border border-gray-500">
			<div className="flex items-center px-2 py-1 bg-[#1f2937] rounded-tl-lg rounded-tr-lg justify-between  gap-5">
				<ModeSelectButton   menuType="languages" ITEMS_ARRAY={LANGUAGES} isMenuOpen = {isLanguageMenuOpen} selectedItem={selectedLanguage}/>
				<div className="flex flex-row gap-2 items-center ">
        <ModeSelectButton  menuType="theme" ITEMS_ARRAY={EDITOR_THEMES} isMenuOpen = {isThemeMenuOpen} selectedItem={seletedTheme}/>
					<Button classname={" hover:bg-gray-700 rounded-full "}>
						<IoSettings className="text-white" />
					</Button>
					<Button
						classname={"hover:bg-gray-700 rounded-full"}
						onClick={() =>
							setToggleFullScreen((prevState) => !prevState)
						}
					>
						<GoScreenFull className="text-white" />
					</Button>
				</div>
			</div>
			<div className="border border-gray-500">
				<CodeEditor />
			</div>
		</section>
	);
};



// function ThemeDropDownMenu({ITEMS_ARRAY}: {ITEMS_ARRAY: string[]}) {

// 	const { isThemeMenuOpen } = useSelector(
// 		(state: RootState) => state.dropdown
// 	);
//   const dispatch = useAppDispatch();
// 	return (
// 		<div
// 			className={`flex flex-col bg-darkGray absolute bottom-0 left-0 right-[-20%] top-[110%] h-[195px] items-center rounded-lg py-2 z-10 shadow-md text-sm ${
// 				isThemeMenuOpen
// 					? "transform translate-y-0 opacity-100 block"
// 					: "translate-y-[-50%] opacity-0 hidden"
// 			} ease-in-out duration-300`}
// 		>
// 			{EDITOR_THEMES.map((mode, index) => {
// 				return (
// 					<span
// 						key={index}
// 						className="text-white font-normal hover:bg-hover flex  items-center px-2 py-2 w-[90%] rounded-md h-full"
// 						onClick={() => dispatch(setSelectedLanguage(mode))}
// 					>
// 						{mode}
// 					</span>
// 				);
// 			})}
// 		</div>
// 	);
// }

{/* <Button classname="bg-darkGray text-white flex gap-2 items-center rounded-md">
	<span>Submit</span>
	<MdOutlineFileUpload />
</Button>; */}
