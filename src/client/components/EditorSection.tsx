import { Button } from "../components/Button";
// import { MdOutlineFileUpload } from "react-icons/md";
import { ModeSelectButton } from "./ModeSelectButton";
import { CodeEditor } from "./CodeEditor";
import { IoSettings } from "react-icons/io5";
import { GoScreenFull } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { toggleFullScreen } from "../features/dropDownSlice";
import Split from "react-split";

const LANGUAGES = ["java", "cpp", "javascript", "go", "rust"];
const EDITOR_THEMES = ["default", "GitHub Dark", "OneDark Pro"];

export const EditorSection = () => {
	const dispatch = useAppDispatch();
	const {
		isLanguageMenuOpen,
		isThemeMenuOpen,
		selectedLanguage,
		seletedTheme,
		isFullScreen,
	} = useSelector((state: RootState) => state.dropdown);

	return (
		<section className=" w-full">
			<Split
				className="h-full rounded-lg "
				direction="vertical"
				gutterSize={8}
				minSize={50}
				gutterAlign = {'end'}
			>
				<div className="  bg-darkGray rounded-lg border border-gray-500">
					<div className="flex items-center px-2 py-1 bg-[#1f2937] rounded-tl-lg rounded-tr-lg justify-between  gap-5">
						<ModeSelectButton
							menuType="languages"
							ITEMS_ARRAY={LANGUAGES}
							isMenuOpen={isLanguageMenuOpen}
							selectedItem={selectedLanguage}
						/>
						<div className="flex flex-row gap-2 items-center ">
							<ModeSelectButton
								menuType="theme"
								ITEMS_ARRAY={EDITOR_THEMES}
								isMenuOpen={isThemeMenuOpen}
								selectedItem={seletedTheme}
							/>
							<Button
								classname={" hover:bg-gray-700 rounded-full "}
							>
								<IoSettings className="text-white" />
							</Button>
							<Button
								classname={"hover:bg-gray-700 rounded-full"}
								onClick={() =>
									dispatch(toggleFullScreen(!isFullScreen))
								}
							>
								<GoScreenFull className="text-white" />
							</Button>
						</div>
					</div>
					<div className="border border-gray-500">
						<CodeEditor />
					</div>
				</div>
				<div className=" text-white w-full bg-darkGray rounded-lg border border-gray-500">
					this is console section
				</div>
			</Split>
		</section>
	);
};

{
	/* <Button classname="bg-darkGray text-white flex gap-2 items-center rounded-md">
	<span>Submit</span>
	<MdOutlineFileUpload />
</Button>; */
}
