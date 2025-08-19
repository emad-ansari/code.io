import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Split from "react-split";
import { RootState, useAppDispatch } from "@/client/app/store";
import {
	ChevronDown,
	ChevronUp,
	CloudUpload,
	Play,
} from "lucide-react";

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
import { EditorTopBar } from "./EditorTopBar";
import { OutputConsole } from "./RenderExecutionResult";





export const EditorSection = () => {
	const dispatch = useAppDispatch();
	const { problemId } = useParams();

	const [splitRatio, setSplitRatio] = useState<[number, number]>([100, 0]);
	const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false);
	const { isLogin } = useSelector((state: RootState) => state.user);

	const { language, code, loading } = useSelector(
		(state: RootState) => state.editor
	);

	const onRunCode = () => {
		if (!isLogin) return;

		if (!problemId) return;

		if (!isConsoleOpen) {
			setSplitRatio([60, 40]);
		}

		setIsConsoleOpen((prevState) => !prevState);

		dispatch(
			runCode({
				problemId,
				language,
				code,
			})
		);
	};

	const onSubmitCode = () => {
		if (!isLogin) return;

		if (!problemId) return;

		if (!isConsoleOpen) {
			setSplitRatio([60, 40]);
		}
		setIsConsoleOpen((prevState) => !prevState);

		dispatch(
			submitCode({
				problemId,
				language,
				code
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
											className="justify-center flex gap-2 items-center rounded-md w-20  cursor-pointer  text-red-500 border border-red-500/50"
											onClick={onRunCode}
										>
											{loading ? (
												<Icons.spinner className="mr-0 h-4 w-4 animate-spin " />
											) : (
												<Play
													size={16}
													strokeWidth={2.5}
												/>
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
											className="justify-center flex gap-2 items-center rounded-md  cursor-pointer text-green-500  border border-green-500/50 font-semibold"
										>
											<CloudUpload
												size={16}
												strokeWidth={2.5}
											/>
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
