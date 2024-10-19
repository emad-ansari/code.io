import { useState } from "react";
import { CodeEditor } from "./CodeEditor";
import {
	ChevronDown,
	ChevronUp,
	CloudUpload,
	Maximize,
	Minimize,
	Play,
	Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import { ConsoleSkeleton } from "../skeletons/ConsoleSkeleton";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import { EditorSetting } from "./EditorSetting";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { setOpenDropDownMenu } from "../../features/dropDownSlice";
import {
	fetchDefaultCode,
	setLanguage,
	runCode,
	toggleFullScreen,
} from "../../features/editorSlice";
import { setIsOpen } from "../../features/editorSettingSlice";
import { useLocation, useParams } from "react-router-dom";
import { SubmissionDetails } from "@/client/types";
import Split from "react-split";

const LANGUAGES = ["java", "cpp", "typescript", "javascript", "go", "rust"];

export const EditorSection = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const id = location.state?.id;

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
		<section >
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
					className="  bg-darkGray rounded-lg   flex flex-1 flex-col overflow-hidden border border-BORDER transition-all duration-500 ease-in-out"
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
								className="flex w-28 gap-2 hover:bg-gray-800 rounded-md items-center"
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
									<ChevronDown
										size={15}
										strokeWidth={2.5}
										absoluteStrokeWidth
									/>
								) : (
									<ChevronUp
										size={15}
										strokeWidth={2.5}
										absoluteStrokeWidth
									/>
								)}
							</Button>
						</div>

						<div className="flex flex-row items-center gap-5">
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											className=" text-white justify-center flex gap-2 items-center rounded-md w-20 border border-[#334155]"
											onClick={() => {
												if (!isLogin) return;
												if (!id) return;

												if (!isConsoleOpen) {
													setSplitRatio([60, 40]);
												}
												setIsConsoleOpen(
													(prevState) => !prevState
												);
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
											{loading ? (
												<Icons.spinner className="mr-0 h-4 w-4 animate-spin " />
											) : (
												<Play size={16} />
											)}
											<span>Run</span>
										</Button>
									</TooltipTrigger>
									{!isLogin && (
										<TooltipContent className="bg-gray-800">
											<p>
												You are not logged in, please
												login{" "}
											</p>
										</TooltipContent>
									)}
								</Tooltip>
							</TooltipProvider>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											// variant={'outline'}
											className=" text-white justify-center flex gap-2 items-center rounded-md  border border-[#334155]"
										>
											<span className="font-semibold ">
												Submit
											</span>
											<CloudUpload size={16} />
										</Button>
									</TooltipTrigger>
									{!isLogin && (
										<TooltipContent className="bg-gray-800">
											<p>
												You are not logged in, please
												login{" "}
											</p>
										</TooltipContent>
									)}
								</Tooltip>
							</TooltipProvider>
						</div>
					</div>
					<div className="overflow-y-scroll">
						{loading ? <ConsoleSkeleton /> : <OutputConsole />}
					</div>
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
	const { title } = useParams();
	const { isFullScreen } = useSelector((state: RootState) => state.editor);

	const handleLanguageChange = (item: string) => {
		
		if (title) {
			const formattedTitle = title.replace(/-/g, " ");
			dispatch(setLanguage(item));
			dispatch(
				fetchDefaultCode({
					problemTitle: formattedTitle,
					languageId: LNAGUAGE_MAPPING[`${item}`].languageId,
				})
			);
		}
	};

	return (
		<div className="flex items-center px-2 py-1 bg-darkGray rounded-tl-lg rounded-tr-lg justify-between  gap-5 border border-b-[#334155] border-t-transparent border-l-transparent border-r-transparent">
			<Select onValueChange={(value) => handleLanguageChange(value)}>
				<SelectTrigger className="w-28 text-white border border-none bg-gray-800">
					<SelectValue placeholder="Java" className="texxt-white" />
				</SelectTrigger>
				<SelectContent className="bg-darkGray text-white border border-BORDER">
					<SelectGroup className="">
						{LANGUAGES.map((item, index) => {
							return (
								<SelectItem
									value={item}
									key={index}
									className="cursor-pointer"
								>
									{item}
								</SelectItem>
							);
						})}
					</SelectGroup>
				</SelectContent>
			</Select>
			<div className="flex flex-row gap-2 items-center ">
				<Button
					className={" hover:bg-gray-800 rounded-full "}
					onClick={() => dispatch(setIsOpen(true))}
				>
					<Settings size={16} className="text-white" />
				</Button>

				<Button
					className={"hover:bg-gray-800 rounded-full"}
					onClick={() => dispatch(toggleFullScreen(!isFullScreen))}
				>
					{isFullScreen ? (
						<Minimize size={16} className="text-white" />
					) : (
						<Maximize size={16} className="text-white" />
					)}
				</Button>
			</div>
		</div>
	);
}

function OutputConsole() {
	const { execution_result } = useSelector(
		(state: RootState) => state.editor
	);

	const resultStatus = execution_result.overallStatus;
	const passed_testcases = execution_result.passed_testcases;

	return (
		<div className="px-4 py-2 flex flex-col gap-4">
			<div className="flex flex-row items-center justify-between">
				<span
					className={`text-2xl font-semibold ${
						resultStatus === "Accepted"
							? "text-[#4ac3ab]"
							: "text-[#ea4545]"
					}`}
				>
					{resultStatus}
				</span>
				{passed_testcases >= 0 && (
					<span>Passed test cases: {passed_testcases}/2</span>
				)}
			</div>
			<div>
				<RenderOutput resultStatus={resultStatus} />
			</div>
		</div>
	);
}

function WrongAnswerOrAccepted() {
	const { execution_result } = useSelector(
		(state: RootState) => state.editor
	);
	const submissions = execution_result.submissions;
	const [selectedTestCaseTab, setSelectedTestCaseTab] =
		useState<SubmissionDetails>(submissions[0]);

	return (
		<>
			<div className="flex flex-row gap-3 mb-6">
				{submissions.map((submission, index) => {
					const { description } = submission.status;
					return (
						<div
							className="bg-gray-800 rounded-lg px-4 py-1 flex flex-row gap-1 items-center cursor-pointer "
							key={index}
							onClick={() => setSelectedTestCaseTab(submission)}
						>
							<span
								className={`text-lg ${
									description === "Accepted"
										? "text-GREEN"
										: "text-red-500"
								}`}
							>
								•
							</span>
							Case
							<span>{index + 1}</span>
						</div>
					);
				})}
			</div>
			{selectedTestCaseTab && (
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<label
							className="text-md text-gray-400 font-medium"
							htmlFor=""
						>
							Input
						</label>
						<code className="bg-gray-800 px-4 py-4 rounded-lg">
							{`${selectedTestCaseTab.inputs
								.map(
									(input) => `${input.name} = ${input.value}`
								)
								.join(", ")}`}
						</code>
					</div>
					<div className="flex flex-col gap-2">
						<label
							htmlFor=""
							className="text-md text-gray-400 font-medium"
						>
							User Output
						</label>
						<code className="bg-gray-800 px-4 py-4 rounded-lg">
							{selectedTestCaseTab.stdout}
						</code>
					</div>
					<div className="flex flex-col gap-2">
						<label
							htmlFor=""
							className="text-md text-gray-400 font-medium"
						>
							Expected Output
						</label>
						<code className="bg-gray-800 px-4 py-4 rounded-lg">
							{selectedTestCaseTab.expected_output}
						</code>
					</div>
				</div>
			)}
		</>
	);
}

function RenderOutput({ resultStatus }: { resultStatus: string }) {
	switch (resultStatus) {
		case "Accepted":
		case "Wrong Answer":
			return <WrongAnswerOrAccepted />;
		case "Time Limit Exceed":
			return <TimeLimitExceed />;
		case "Compilation Error":
			return <CompilationError />;
		default:
			return <div></div>;
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
	const { execution_result } = useSelector(
		(state: RootState) => state.editor
	);
	const submissions = execution_result.submissions;
	return (
		<div className="flex flex-col gap-2">
			<label className="text-md text-gray-400 font-medium" htmlFor="">
				Compile Output:
			</label>
			<code className="bg-[#402d2d] text-[#d75151] px-4 py-4 rounded-lg">
				{submissions[0].compile_output}
			</code>
		</div>
	);
}

function TimeLimitExceed() {
	return (
		<div className="flex flex-col gap-1">
			<label className="text-md text-gray-400 font-medium" htmlFor="">
				Last Executed Input:{" "}
			</label>
			<code className="bg-gray-800 px-4 py-4 rounded-lg">n = 50000</code>
		</div>
	);
}

// This component is used for the loading spinner
export const Icons = {
	spinner: (props: React.SVGProps<SVGSVGElement>) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="30"
			height="30"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="M21 12a9 9 0 1 1-6.219-8.56" />
		</svg>
	),
};
