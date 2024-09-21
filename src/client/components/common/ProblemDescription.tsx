import { TestCaseExample } from "./TestCaseExample";
import { Button } from "./Button";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BiAdjust } from "react-icons/bi";
import {
	useNavigate,
	Outlet,
	useParams,
} from "react-router-dom";
import { useEffect } from "react";
import { getSpecificProblemDetails } from "@/client/features/problemSlice";
import { RootState, useAppDispatch } from "@/client/app/store";
import { useSelector } from "react-redux";

export const ProblemDescription = () => {
	const navigate = useNavigate();

	return (
		<section className="rounded-lg bg-darkGray  text-white  border border-[#334155] ">
			<div className="flex items-center bg-darkGray px-2 py-1 rounded-tl-lg rounded-tr-lg gap-5  border border-b-[#334155] border-t-transparent border-l-transparent border-r-transparent">
				<Button
					classname="hover:bg-gray-800 text-white rounded-md"
					onClick={() => navigate("./description")}
				>
					<span>Description</span>
				</Button>

				<Button
					classname="hover:bg-gray-800 text-white rounded-md"
					onClick={() => navigate("submissions")}
				>
					<span>Submissons</span>
				</Button>
			</div>
			<Outlet />
		</section>
	);
};

export function ProblemStatement() {
	const { id  } = useParams();

	const { problemDetail } = useSelector((state: RootState) => state.problem);
	const { status, problem, testcaseExamples } = problemDetail;
	const { isLogin } = useSelector((state: RootState) => state.user);

	console.log(problemDetail);

	const dispatch = useAppDispatch();
	useEffect(() => {
		if (id){
			dispatch(getSpecificProblemDetails(id));
		}
		else  {
			console.log('problem id is not undefined')
		}
		
	}, []);

	return (
		<div className="flex flex-col gap-4 px-5 pb-3 overflow-y-scroll scroll-smooth h-[93%]">
			<div className="flex flex-col gap-5 pt-5 ">
				<div className="flex flex-row items-center justify-between">
					<span className="text-[26px] font-semibold">
						{problem.problemNo}.
						{problem.title}
					</span>
					<div className="flex flex-row gap-12">
						<span className={`font-normal text-sm  bg-gray-800 px-3 py-1 rounded-full ${problem.difficulty == 'Easy' ? 'text-[#4ac3ab]': problem.difficulty === 'Medium' ?  'text-YELLOW' : 'text-RED'} `}>
							{problem.difficulty}
						</span>
						{isLogin && status !== "todo" && (
							<div className="flex flex-row gap-1  items-center  bg-gray-800 rounded-full px-3 py-1">
								<span className="text-sm">
									{status === "solved"
										? "Solved"
										: "Attempted"}
								</span>
								{status === "solved" ? (
									<IoMdCheckmarkCircleOutline className="text-[#4ac3ab]" />
								) : (
									<BiAdjust className="text-YELLOW" />
								)}
							</div>
						)}
					</div>
				</div>
				<span className="text-justify text-gray-400">{problem.description}</span>
			</div>
			<div className="flex flex-col gap-8 ">
				{testcaseExamples.map((testcase, index) => {
					return (
						<TestCaseExample
							key={testcase.id}
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
