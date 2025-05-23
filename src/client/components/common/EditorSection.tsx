import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Split from "react-split";
import { RootState, useAppDispatch } from "@/client/app/store";

import { ChevronDown, ChevronUp, CloudUpload, Play } from "lucide-react";
import { Button } from "@/client/components/ui/button";
import { ConsoleSkeleton } from "@/client/components/skeletons/ConsoleSkeleton";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/client/components/ui/tooltip";
import { Icons } from "@/client/components/ui/icons";
import { runCode, submitCode } from "@/client/features/codeEditorSlice";
import { CodeEditor } from "./CodeEditor";
import { LNAGUAGE_MAPPING } from "@/client/lib/types";
import { EditorTopBar } from "./EditorTopBar";
import { RenderExecutionResult } from "./RenderExecutionResult";

export const EditorSection = () => {
	const dispatch = useAppDispatch();
	const { title } = useParams();
	const formattedTitle = title?.replace(/-/g, " ") || "";

	const [splitRatio, setSplitRatio] = useState<[number, number]>([100, 0]);
	const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false);
	const { isLogin } = useSelector((state: RootState) => state.user);

	const { language, code, loading } = useSelector(
		(state: RootState) => state.editor
	);

	const onRunCode = () => {
		if (!isLogin) return;

		if (!title) return;

		if (!isConsoleOpen) {
			setSplitRatio([60, 40]);
		}

		setIsConsoleOpen((prevState) => !prevState);

		dispatch(
			runCode({
				problemTitle: formattedTitle,
				languageId: LNAGUAGE_MAPPING[`${language}`].languageId,
				code: code,
			})
		);
	};

	const onSubmitCode = () => {
		if (!isLogin) return;

		if (!title) return;

		if (!isConsoleOpen) {
			setSplitRatio([60, 40]);
		}
		setIsConsoleOpen((prevState) => !prevState);
		
		dispatch(
			submitCode({
				problemTitle: formattedTitle,
				languageId: LNAGUAGE_MAPPING[`${language}`].languageId,
				code: code,
			})
		);

	}

	return (
		<section>
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
					className="  rounded-lg  flex flex-1 flex-col overflow-hidden border-[1.5px] border-code-border transition-all duration-500 ease-in-out"
				>
					<EditorTopBar />
					<div className=" h-full">
						<CodeEditor />
					</div>
				</div>
				<div className="flex-col text-white w-full  bg-code-bg rounded-lg border-[1.5px] border-code-border flex flex-1 overflow-hidden transition-all duration-500 ease-in-out">
					<div className=" flex bg-code-bg rounded-tl-lg rounded-tr-lg px-2 py-1.5 items-center justify-between border border-b-code-border border-l-transparent border-r-transparent border-t-transparent">
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
											onClick={onRunCode}
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
											onClick={onSubmitCode}
											className=" text-white justify-center flex gap-2 items-center rounded-md  border border-[#334155]"
										>
											<CloudUpload size={16} />
											<span className="font-semibold ">
												Submit
											</span>
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
		</section>
	);
};

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
				<RenderExecutionResult resultStatus={resultStatus} />
			</div>
		</div>
	);
}
