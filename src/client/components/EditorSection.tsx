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
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
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

	const [splitRatio, setSplitRatio] = useState<[number, number]>([100, 0]);
	const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false);

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
					<div className=" flex bg-[#1f2937] rounded-tl-lg rounded-tr-lg px-2 py-1 items-center justify-between">
						<div className="flex gap-5">
							<Button classname="relative flex w-28 gap-1 bg-hover rounded-md">
								<span className="text-md font-medium">
									Console
								</span>
								{!isConsoleOpen ? (
									<TiArrowSortedDown
										onClick={() => {
											setSplitRatio([60, 40]);
											setIsConsoleOpen(
												(prevState) => !prevState
											);
										}}
										className="absolute top-1/3 right-4 "
									/>
								) : (
									<TiArrowSortedUp
										onClick={() => {
											setSplitRatio([100, 0]);
											setIsConsoleOpen(
												(prevState) => !prevState
											);
										}}
										className="absolute top-1/3 right-4 "
									/>
								)}
							</Button>
						</div>

						<div className="flex flex-row items-center gap-5">
							<Button classname="bg-gray-700 text-white justify-center flex items-center rounded-md w-20">
								Run
							</Button>
							<Button classname="bg-GREEN text-white flex gap-2 items-center rounded-md">
								<span className="font-semibold">Submit</span>
								<MdOutlineFileUpload />
							</Button>
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
					Status
				</span>
				<span>Passed test cases: 2/2</span>
			</div>
			{/* 
				if status == Accepted then display the Accepted component 
				if status == Wrong Answer display the wrong answer component
				if status == Time limit exceeded , display the TimeLimti exceeded component
			*/}
			<div></div>
		</div>
	);
}

// Wrong Answer! || Accepted! || Time Limit exceeded! || Compilation Error!

/*
	1. Wrong Answer: Input, Your Output, Expected Output
	2. Time Limit Exceeded : Last executed Input
	3. Accepted: 
	4. Compilation Error: display the error

*/
function CompilationError() {
	return (
		<div>
			<span>Compile Output: </span>
			<div className="bg-red-300">
				<p>
					Main.java:23: error: incompatible types: missing return
					value return ; ^ 1 error
				</p>
			</div>
		</div>
	);
}

function Accepted() {
	return <div>your code has been successfully accepted.</div>;
}
function TimeLimitExceed() {
	return (
		<div className="flex items-center gap-4 px-4 py-2 bg-gray-800">
			<span>Last Executed Input: </span>
			<span>input value</span>
		</div>
	);
}

function WrongAnswer() {
	return (
		<div>
			<div className="flex items-center px-2 py-2 bg-gray-800">
				<span>Input:</span>
				<span>value</span>
			</div>
			<div className="flex items-center px-4 py-2 bg-gray-800">
				<span>Your Output:</span>
				<span className="text-RED">user output value</span>
			</div>
			<div className="flex items-center px-4 py-2 bg-gray-800">
				<span>Exptected Output:</span>
				<span className="text-GREEN">expted output value</span>
			</div>
		</div>
	);
}
