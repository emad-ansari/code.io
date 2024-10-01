import { RootState, useAppDispatch } from "@/client/app/store";
import { getSpecificProblemDetails } from "@/client/features/problemSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TestCaseExample } from "./TestCaseExample";
import { BiAdjust } from "react-icons/bi";
import { ListTodo } from "lucide-react";

export default function ProblemStatement() {
	const { id } = useParams();

	const { problemDetail } = useSelector((state: RootState) => state.problem);
	const { status, problem, testcaseExamples } = problemDetail;
	const { isLogin } = useSelector((state: RootState) => state.user);
	console.log("problem detials: ", problemDetail);

	const dispatch = useAppDispatch();
	useEffect(() => {
		if (id) {
			dispatch(getSpecificProblemDetails(id));
		} else {
			console.log("problem id is not undefined");
		}
	}, []);

	return (
		<div className="flex flex-col gap-4 px-5 pb-3 overflow-y-scroll scroll-smooth h-[93%]">
			<div className="flex flex-col gap-5 pt-5 ">
				<div className="flex flex-row items-center justify-between">
					<span className="flex gap-2 text-[26px] font-semibold">
						{problem.problemNo !== 0 && (
							<span>{problem.problemNo}.</span>
						)}
						<span>{problem.title}</span>
					</span>
					<div className="flex flex-row gap-4">
						<span
							className={`font-normal text-sm  bg-gray-800 px-3 py-1 rounded-full ${
								problem.difficulty == "Easy"
									? "text-[#4ac3ab]"
									: problem.difficulty === "Medium"
									? "text-YELLOW"
									: "text-RED"
							} `}
						>
							{problem.difficulty}
						</span>
						{isLogin && (
							<div className="flex flex-row gap-1 items-center  bg-gray-800 rounded-full px-3 py-1">
								<span className="text-sm">{status}</span>
								<span className="flex items-center">
									{status === "solved" ? (
										<IoMdCheckmarkCircleOutline className="text-[#4ac3ab]" />
									) : status === "Attempted" ? (
										<BiAdjust className="text-YELLOW" />
									) : (
										<ListTodo size={16} />
									)}
								</span>
							</div>
						)}
					</div>
				</div>
				<span className="text-justify text-gray-400">
					{problem.description}
				</span>
			</div>
			<div className="flex flex-col gap-8 ">
				{testcaseExamples.map((testcase, index) => {
					return (
						<TestCaseExample
							key={index}
							testCaseNumber={index}
							inputs={testcase.inputs}
							output={testcase.output}
						/>
					);
				})}
			</div>
		</div>
	);
}
