import { Button } from "../components/Button";
import { MdOutlineFileUpload } from "react-icons/md";
import { ModeSelectButton } from "./ModeSelectButton";
import { useState } from "react";
import { CodeEditor } from "./CodeEditor";
import {
	IoSettings,
	IoChevronDownOutline,
	IoChevronUpOutline,
} from "react-icons/io5";
import { GoScreenFull } from "react-icons/go";
import { EditorSetting } from "./EditorSetting";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { setOpenDropDownMenu } from "../features/dropDownSlice";
import { toggleFullScreen } from "../features/editorSlice";
import Split from "react-split";
import { setIsOpen } from "../features/editorSettingSlice";

const LANGUAGES = ["java", "cpp", "javascript", "go", "rust"];

export const EditorSection = () => {
	const dispatch = useAppDispatch();
	const { isLanguageMenuOpen, isThemeMenuOpen } = useSelector(
		(state: RootState) => state.dropdown
	);
	const { isOpen } = useSelector((state: RootState) => state.setting);

	const handleOpenDropDown = () => {
		if (isLanguageMenuOpen) {
			dispatch(setOpenDropDownMenu({ menu: "languages" }));
		}
		if (isThemeMenuOpen) {
			dispatch(setOpenDropDownMenu({ menu: "theme" }));
		}
	};
	const [openTestCaseTab, setOpenTestCaseTab] = useState<boolean>(true);
	const [splitRatio, setSplitRatio] = useState<[number, number]>([100, 0]);
	const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false);
	console.log("split reaito: ", splitRatio);
	console.log("is console open : ", isConsoleOpen);

	return (
		<section className="">
			<Split
				sizes={splitRatio}
				className="h-full rounded-lg "
				direction="vertical"
				gutterSize={8}
				minSize={50}
				gutterAlign={"end"}
			>
				<div
					id="editor-container "
					className="  bg-darkGray rounded-lg border border-gray-500  flex flex-1 flex-col overflow-hidden "
				>
					<EditorTopBar />
					<div
						className="border border-gray-500 h-full"
						onClick={() => handleOpenDropDown()}
					>
						<CodeEditor />
					</div>
				</div>
				<div className="flex-col text-white w-full bg-darkGray rounded-lg border border-gray-500 flex flex-1 overflow-hidden">
					<div className=" flex bg-[#1f2937] rounded-tl-lg rounded-tr-lg px-2 py-2 items-center justify-between">
						<div className="flex gap-5">
							<span
								className={`text-md font-semibold px-2 py-1 rounded-md cursor-pointer hover:bg-hover `}
							>
								Output
							</span>
						</div>

						<div className="hover:bg-hover rounded-full">
							{!isConsoleOpen ? (
								<IoChevronDownOutline
									onClick={() => {
										setSplitRatio([60, 40]);
										setIsConsoleOpen(
											(prevState) => !prevState
										);
									}}
									className="text-lg w-full h-full rounded-full px-2 py-2"
								/>
							) : (
								<IoChevronUpOutline
									onClick={() => {
										setSplitRatio([100, 0]);
										setIsConsoleOpen(
											(prevState) => !prevState
										);
									}}
									className="text-lg w-full h-full rounded-full px-2 py-2"
								/>
							)}
						</div>
					</div>
					<div>
						<RenderResult />
					</div>
				</div>
			</Split>
			{isOpen && <EditorSetting />}
		</section>
	);
};

function EditorTopBar() {
	const dispatch = useAppDispatch();
	const { isLanguageMenuOpen } = useSelector(
		(state: RootState) => state.dropdown
	);

	const { isFullScreen, language } = useSelector(
		(state: RootState) => state.editor
	);
	return (
		<div className="flex items-center px-2 py-1 bg-[#1f2937] rounded-tl-lg rounded-tr-lg justify-between  gap-5">
			<ModeSelectButton
				menuType="languages"
				ITEMS_ARRAY={LANGUAGES}
				isMenuOpen={isLanguageMenuOpen}
				selectedItem={language}
			/>
			<div className="flex flex-row gap-2 items-center ">
				<Button classname="bg-gray-700 text-white flex gap-2 items-center rounded-md">
					<span>Submit</span>
					<MdOutlineFileUpload />
				</Button>

				<Button
					classname={" hover:bg-gray-700 rounded-full "}
					onClick={() => dispatch(setIsOpen(true))}
				>
					<IoSettings className="text-white" />
				</Button>

				<Button
					classname={"hover:bg-gray-700 rounded-full"}
					onClick={() => dispatch(toggleFullScreen(!isFullScreen))}
				>
					<GoScreenFull className="text-white" />
				</Button>
			</div>
		</div>
	);
}

function RenderResult() {
	return (
		<div className="px-4 py-2 flex flex-col gap-4">
			<div className="flex flex-row items-center justify-between">
				<span className="text-xl font-semibold text-[#4ac3ab]">
					Accepted
				</span>
				<span>Passed test cases: 2/2</span>
			</div>
			<div className="flex flex-row gap-3">

			</div>
			<div>
				
			</div>
		</div>
	);
}
