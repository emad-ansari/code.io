import React, { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/client/app/store";
import { Label } from "../ui/label";
import {
	errorClassname,
	SubmissionDetails,
	successClassname,
} from "@/client/lib/types";

import {
	CheckCircle,
	CircleAlert,
	CircleX,
	ClockAlert,
	DatabaseBackup,
	TriangleAlert,
} from "lucide-react";

interface RenderExecutionResultProps {
	submission: SubmissionDetails;
}

interface ResultCardProps {
	submission: SubmissionDetails;
	onOpenDetail: React.Dispatch<
		React.SetStateAction<SubmissionDetails | null>
	>;
}


export function OutputConsole() {
	const { submission_result } = useSelector(
		(state: RootState) => state.editor
	);
	const { passed_testcases, submissions } = submission_result;

	const [currentResult, setCurrentResult] =
		useState<SubmissionDetails | null>(submissions[0]);

	return (
		<>
			{currentResult && (
				<div className="flex flex-col px-4 py-2 gap-4">
					<div className="flex items-center justify-between">
						<h1 className="text-lg font-semibold text-green-500">
							Execution Result{" "}
						</h1>
						<div className="flex items-center gap-2  bg-code-dark px-2 py-1 rounded-md text-gray-400 text-sm border border-gray-600 ">
							<span className="font-semibold">
								Passed Testcases:{" "}
							</span>
							<div className="flex items-center gap-1">
								<span>
									{passed_testcases == -1
										? 0
										: passed_testcases}
								</span>
								<span>/</span>
								<span>{submissions.length}</span>
							</div>
						</div>
					</div>
					<div className="flex gap-2">
						<div className="flex flex-col gap-2 w-[40%]">
							{submissions.map((sub, i) => (
								<ResultCard
									key={i}
									submission={sub}
									onOpenDetail={setCurrentResult}
								/>
							))}
						</div>
						<div className="flex flex-col gap-3 rounded-lg px-3 py-3 justify-start w-full border border-code-border overflow-y-auto">
							{currentResult && (
								<RenderExecutionResult
									submission={currentResult}
								/>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

const ResultCard: React.FC<ResultCardProps> = ({
	submission,
	onOpenDetail,
}) => {
	switch (submission.status) {
		case "Accepted":
			return (
				<div
					className={successClassname}
					onClick={() => onOpenDetail(submission)}
				>
					<CheckCircle className="w-5 h-5 text-green-500" />
					<span className="text-sm">{submission.status}</span>
				</div>
			);
		case "Wrong Answer":
			return (
				<div
					className={errorClassname}
					onClick={() => onOpenDetail(submission)}
				>
					<CircleX className="w-5 h-5 text-red-500" />
					<span className="text-sm">{submission.status}</span>
				</div>
			);
		case "Compilation Error":
			return (
				<div
					className={errorClassname}
					onClick={() => onOpenDetail(submission)}
				>
					<CircleAlert className="w-5 h-5 text-red-500" />
					<span className="text-sm">{submission.status}</span>
				</div>
			);
		case "Memory Limit Exceeded":
			return (
				<div
					className={errorClassname}
					onClick={() => onOpenDetail(submission)}
				>
					<DatabaseBackup className="w-5 h-5 text-red-500" />
					<span className="text-sm">{submission.status}</span>
				</div>
			);
		case "Run Time Error":
			return (
				<div
					className={errorClassname}
					onClick={() => onOpenDetail(submission)}
				>
					<TriangleAlert className="w-5 h-5 text-red-500" />
					<span className="text-sm">{submission.status}</span>
				</div>
			);
		case "Time Limit Exceeded":
			return (
				<div
					className={errorClassname}
					onClick={() => onOpenDetail(submission)}
				>
					<ClockAlert className="w-5 h-5 text-red-500" />
					<span className="text-sm">{submission.status}</span>
				</div>
			);
		default:
			return (
				<div>
					<span>No status mtaches</span>
				</div>
			);
	}
};

const RenderExecutionResult: React.FC<RenderExecutionResultProps> = ({
	submission,
}) => {
	switch (submission.status) {
		case "Accepted":
		case "Wrong Answer":
			return <WrongAnswerOrAccepted submission={submission} />;
		case "Time Limit Exceeded":
			return <TimeLimitExceed submission={submission} />;
		case "Compilation Error":
			return <CompilationError submission={submission} />;
		case "Run Time Error":
			return <RunTimeError submission={submission} />;
		case "Memory Limit Exceeded":
			return <div>Memory Limit Exceeded</div>;
		default:
			return <div>No status matches</div>;
	}
};

const CompilationError: React.FC<RenderExecutionResultProps> = ({
	submission,
}) => {
	return (
		<div className="flex flex-col gap-2">
			<Label className="text-md text-gray-300">Compile Output:</Label>
			<span className="bg-red-800/10 text-red-500 px-4 py-4 rounded-lg border border-red-500/10">
				{submission.compile_output}
			</span>
		</div>
	);
};

const TimeLimitExceed: React.FC<RenderExecutionResultProps> = ({
	submission,
}) => {
	return (
		<div className="flex flex-col gap-1">
			<Label className="text-md text-gray-400 font-medium">Input:</Label>
			<span className="bg-gray-800 px-4 py-4 rounded-lg">
				{submission.input}
			</span>
		</div>
	);
};

const WrongAnswerOrAccepted: React.FC<RenderExecutionResultProps> = ({
	submission,
}) => {
	return (
		<div className="flex flex-col gap-3">
			<h1
				className={`text-md ${
					submission.status == "Accepted"
						? "text-green-500"
						: "text-red-500"
				}`}
			>
				{submission.status}
			</h1>
			<div className="flex flex-col gap-1   text-gray-300">
				<Label className="mb-1">Input: </Label>
				<span className="rounded-lg bg-code-dark px-2 py-1">
					{submission.input}
				</span>
			</div>
			<div className="flex flex-col gap-1   text-gray-300">
				<Label className="mb-1">User Output: </Label>
				<span className="rounded-lg bg-code-dark px-2 py-1">
					{submission.user_output}
				</span>
			</div>
			<div className="flex flex-col gap-1   text-gray-300">
				<Label className="mb-1">Expected Output: </Label>
				<span className="rounded-lg bg-code-dark px-2 py-1">
					{submission.expected_output}
				</span>
			</div>
		</div>
	);
};

const RunTimeError: React.FC<RenderExecutionResultProps> = ({ submission }) => {
	return (
		<div className="flex flex-col gap-2">
			<Label className="text-md text-red-500">Run Time Error </Label>
			<span className="bg-red-800/10 text-red-500 px-4 py-4 rounded-lg border border-red-500/10">
				{submission.compile_output}
			</span>
			<Label className="text-sm text-gray-400">
				Last Executed Input:{" "}
			</Label>
			<span className="rounded-lg bg-code-dark px-2 py-1">
				{submission.input}
			</span>
		</div>
	);
};
