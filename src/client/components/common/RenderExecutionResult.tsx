import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/client/app/store";
import { SubmissionDetails } from "@/client/lib/types";


export function RenderExecutionResult({ resultStatus }: { resultStatus: string }) {
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
										? "text-code-green"
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