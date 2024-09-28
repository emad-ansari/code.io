import { Button } from "../common/Button";
import { MdOutlineFileUpload } from "react-icons/md";
import { useState } from "react";
import { CodeEditor } from "./CodeEditor";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosCheckmark } from "react-icons/io";
import {
	IoSettings,
	// IoChevronDownOutline,
	// IoChevronUpOutline,
} from "react-icons/io5";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import { GoScreenFull } from "react-icons/go";
import { EditorSetting } from "./EditorSetting";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { setOpenDropDownMenu } from "../../features/dropDownSlice";
import {
	toggleFullScreen,
	getDefaultCode,
	setLanguage,
	runCode,
} from "../../features/editorSlice";
import Split from "react-split";
import { setIsOpen } from "../../features/editorSettingSlice";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import { useParams } from "react-router-dom";
import { SubmissionDetails } from "@/client/types";

const LANGUAGES = ["java", "cpp", "typescript", "javascript", "go", "rust"];

export const EditorSection = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const { isLanguageMenuOpen, isThemeMenuOpen } = useSelector(
		(state: RootState) => state.dropdown
	);
	const { isOpen } = useSelector((state: RootState) => state.setting);
	const { language, code, loading } = useSelector(
		(state: RootState) => state.editor
	);

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
	const { isLogin } = useSelector((state: RootState) => state.user);

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
					className="  bg-darkGray rounded-lg   flex flex-1 flex-col overflow-hidden border border-[#334155] transition-all duration-500 ease-in-out"
				>
					<EditorTopBar />
					<div
						className=" h-full"
						onClick={() => handleOpenDropDown()}
					>
						<CodeEditor />
					</div>
				</div>
				<div className="flex-col text-white w-full bg-darkGray rounded-lg border border-[#334155] flex flex-1 overflow-hidden transition-all duration-500 ease-in-out">
					<div className=" flex bg-darkGray rounded-tl-lg rounded-tr-lg px-2 py-1.5 items-center justify-between border border-b-[#334155] border-l-transparent border-r-transparent border-t-transparent">
						<div className="flex gap-5">
							<Button
								classname="relative flex w-28 gap-1 hover:bg-gray-800 rounded-md"
								onClick={() => {
									if (!isConsoleOpen) {
										setSplitRatio([60, 40]);
									} else {
										setSplitRatio([100, 0]);
									}

									setIsConsoleOpen((prevState) => !prevState);
								}}
							>
								<span className="text-md font-medium">
									Console
								</span>
								{!isConsoleOpen ? (
									<TiArrowSortedDown className="absolute top-1/3 right-4 " />
								) : (
									<TiArrowSortedUp className="absolute top-1/3 right-4 " />
								)}
							</Button>
						</div>

						<div className="flex flex-row items-center gap-5">
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											disabled={isLogin ? false : true}
											classname=" text-white justify-center flex items-center rounded-md w-20 border border-[#334155]"
											onClick={() => {
												if (!id) {
													return;
												}
												dispatch(
													runCode({
														problemId: id,
														languageId:
															LNAGUAGE_MAPPING[
																`${language}`
															].languageId,
														code: code,
													})
												);
											}}
										>
											Run
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>
											{isLogin
												? ""
												: "You are not logged in, please login "}
										</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											disabled={isLogin ? false : true}
											classname="bg-GREEN text-white flex gap-2 items-center rounded-md"
										>
											<span className="font-semibold">
												Submit
											</span>
											<MdOutlineFileUpload />
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>
											{isLogin
												? ""
												: "You are not logged in, please login "}
										</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</div>
					<div>{!loading && <Console />}</div>
				</div>
			</Split>
			{isOpen && <EditorSetting />}
		</section>
	);
};

export const LNAGUAGE_MAPPING: {
	[key: string]: { name: string; languageId: number };
} = {
	javascript: { name: "javascript", languageId: 63 },
	cpp: { name: "cpp", languageId: 10 },
	typescript: { name: "typescript", languageId: 74 },
	java: { name: "java", languageId: 62 },
	python: { name: "python", languageId: 71 },
};

function EditorTopBar() {
	const dispatch = useAppDispatch();
	const { isLanguageMenuOpen } = useSelector(
		(state: RootState) => state.dropdown
	);

	const { id } = useParams();

	const { isFullScreen, language } = useSelector(
		(state: RootState) => state.editor
	);

	return (
		<div className="flex items-center px-2 py-1 bg-darkGray rounded-tl-lg rounded-tr-lg justify-between  gap-5 border border-b-[#334155] border-t-transparent border-l-transparent border-r-transparent">
			<Button
				classname="relative flex flex-row items-center gap-2 bg-gray-800 text-white z-30 rounded-md"
				onClick={() =>
					dispatch(setOpenDropDownMenu({ menu: "languages" }))
				}
			>
				<span className="text-sm">{language}</span>
				<MdKeyboardArrowDown
					className={`text-2xl pt-1 ${
						isLanguageMenuOpen
							? " transform duration-200  rotate-180 pt-1"
							: "transform duration-200  -rotate-0 pt-1"
					}`}
				/>
				<div
					className={`flex flex-col bg-darkGray absolute bottom-0 left-0 right-[-20%] top-[111%] h-[196px] items-center rounded-lg py-2 z-10 shadow-md text-sm border border-[#334155] ${
						isLanguageMenuOpen
							? "transform translate-y-0 opacity-100 block"
							: "translate-y-[-50%] opacity-0 hidden"
					} ease-in-out duration-300`}
				>
					{LANGUAGES.map((item, index) => {
						return (
							<span
								key={index}
								className="text-white font-normal hover:bg-gray-800 flex  items-center px-2 py-2 w-[90%] rounded-md h-full justify-between"
								onClick={() => {
									if (id) {
										dispatch(setLanguage(item));
										dispatch(
											getDefaultCode({
												problemId: id,
												languageId:
													LNAGUAGE_MAPPING[`${item}`]
														.languageId,
											})
										);
									}
								}}
							>
								{item}
								{item === language && (
									<IoIosCheckmark className="text-2xl font-medium" />
								)}
							</span>
						);
					})}
				</div>
			</Button>
			<div className="flex flex-row gap-2 items-center ">
				<Button
					classname={" hover:bg-gray-800 rounded-full "}
					onClick={() => dispatch(setIsOpen(true))}
				>
					<IoSettings className="text-white" />
				</Button>

				<Button
					classname={"hover:bg-gray-800 rounded-full"}
					onClick={() => dispatch(toggleFullScreen(!isFullScreen))}
				>
					<GoScreenFull className="text-white" />
				</Button>
			</div>
		</div>
	);
}

function Console() {
	const { execution_result } = useSelector(
		(state: RootState) => state.editor
	);
	const resultStatus = execution_result?.overallStatus;
	const passed_testcases = execution_result?.passed_testcases;
	const submissions = execution_result?.submissions;

	return (
		<div className="px-4 py-2 flex flex-col gap-4">
			<div className="flex flex-row items-center justify-between">
				<span className={`text-xl font-semibold ${resultStatus === 'Accepted' ? 'text-[#4ac3ab]': 'text-RED'}`}>
					{resultStatus}
				</span>
				<span>Passed test cases: {passed_testcases}/2</span>
			</div>
			<div>
				<RenderOutput resultStatus = {resultStatus}/>
			</div>
		</div>
	);
}

function WrongAnswer() {
	const { execution_result } = useSelector(
		(state: RootState) => state.editor
	);
	const submissions  = execution_result.submissions;
	const [selectedTab, setSelectedTab] = useState<SubmissionDetails>();

	return (
		<>
			<div>
				{
					submissions.map((submission, index) => {
						const { description } = submission.status;
						return <Button classname="" key = {index} onClick={() => setSelectedTab(submission)}>
							<span className= {`${description === 'Accepted' ? 'text-GREEN': 'text-RED'}`}>•</span>
							Case{index + 1}
						</Button>
					})
				}
			</div>
			{
				selectedTab && (
					<div>
						

					</div>
				)
			}
			

		</>
		
	);
}

function RenderOutput({resultStatus}: { resultStatus: string | undefined}) {
	switch(resultStatus) {
		case 'Accepted': 
			return <Accepted /> 
		case 'Wrong Answer': 
			return <WrongAnswer /> 
		case 'Time Limit Exceed': 
			return <TimeLimitExceed /> 
		case 'Compile Error': 
			return <CompilationError /> 
		default: 
		 	return <div>unknown status {resultStatus} type</div>
	}
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
				<code>
					Main.java:23: error: incompatible types: missing return
					value return ; ^ 1 error
				</code>
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
