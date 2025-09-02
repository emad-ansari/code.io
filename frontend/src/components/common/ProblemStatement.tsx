import { Separator } from "@/components/ui/separator";
import {
	ChevronRight,
	CircleCheckBig,
	Sparkles,
	Target,
	ThumbsDown,
	ThumbsUp,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import { Components } from "react-markdown";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/app/store";
import { useEffect, useState } from "react";
import { fetchProblemDetail, updateLikes } from "@/features/problemSlice";
import { Label } from "../ui/label";
import { Tag } from "./ChallengesCard";

export default function ProblemStatement() {
	const { problemId } = useParams();
	const dispatch = useAppDispatch();
	const { problemDetail } = useSelector((state: RootState) => state.problem);
	const formattedLikes = Intl.NumberFormat("en-Us", {
		notation: "compact",
		maximumFractionDigits: 1,
	}).format(problemDetail?.likes || 0);
	const [showTags, setShowTags] = useState<boolean>(false);

	useEffect(() => {
		if (problemId) {
			dispatch(fetchProblemDetail({ problemId }));
		} else {
			console.log("problem id is undefined");
		}
	}, [problemId]);

	const customComponents: Components = {
		code: ({ node, inline, className, children, ...props }: any) => {
			return (
				<span
					className="
							bg-gray-700
							text-gray-200
							rounded-sm
							px-1
							py-0.5
							text-sm
							font-mono
							dark:bg-code-dark dark:text-gray-100
						"
					{...props}
				>
					{children}
				</span>
			);
		},
		pre({ node, children, ...props }) {
			return (
				<pre
					className="flex flex-col bg-code-dark rounded-md  py-1  overflow-x-auto"
					{...props}
				>
					{children}
				</pre>
			);
		},
		strong({ node, children, ...props }) {
			return (
				<strong className="text-gray-300" {...props}>
					{children}
				</strong>
			);
		},
	};

	return (
		<div className="flex flex-col gap-4 px-5  overflow-y-scroll scroll-smooth h-[93%]">
			<div className="flex flex-col gap-5 pt-5 ">
				<div className="flex flex-row flex-wrap gap-2 items-center justify-between">
					<div className="flex gap-3 items-center  font-semibold">
						<Sparkles className="w-6 h-6 text-code-orange  " />
						<span className="text-white text-[26px]">
							{problemDetail?.title}
						</span>
					</div>
					<div className="flex flex-row gap-4">
						<div className="flex items-center justify-between gap-3 bg-code-dark rounded-full px-3 py-1">
							<div
								className="flex items-center justify-between gap-2 cursor-pointer text-gray-300 hover:text-green-400"
								onClick={() => {
									if (problemDetail?.id) {
										dispatch(
											updateLikes({
												problemId: problemDetail?.id,
											})
										);
									}
								}}
							>
								<ThumbsUp size={16} className="" />
								<span>{formattedLikes}</span>
							</div>
							<Separator
								orientation="vertical"
								className="bg-gray-700"
							/>
							<div className="items-center text-gray-300 cursor-pointer hover:text-red-300">
								<ThumbsDown size={16} />
							</div>
						</div>
						<div
							className={`text-sm flex items-center justify-center bg-code-dark px-3 py-1 rounded-full ${
								problemDetail?.difficulty == "Easy"
									? "text-green-500"
									: problemDetail?.difficulty == "Medium"
									? "text-yellow-500"
									: "text-red-500"
							} `}
						>
							{problemDetail?.difficulty}
						</div>

						{problemDetail?.status && (
							<div className="flex items-center gap-1.5 bg-code-dark rounded-full px-2.5 py-1">
								<span className="text-sm text-gray-300">
									{problemDetail?.status}
								</span>
								{problemDetail?.status === "Accepted" ? (
									<CircleCheckBig
										size={16}
										absoluteStrokeWidth
										className="text-[#4ac3ab]"
									/>
								) : (
									problemDetail?.status == "Attempted" && (
										<Target
											size={16}
											absoluteStrokeWidth
											className="text-yellow-500"
										/>
									)
								)}
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="prose prose-invert max-w-none dark:prose-dark-mode ">
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeSanitize]}
					components={customComponents}
				>
					{problemDetail?.description}
				</ReactMarkdown>
			</div>
			<div className="flex flex-col gap-2 mt-4 mb-5  rounded-lg border border-code-border  ">
				<div
					className={`flex items-center justify-between px-2 py-2 rounded-tl-lg rounded-tr-lg cursor-pointer bg-code-dark ${
						!showTags && "rounded-bl-lg rounded-br-lg"
					}`}
					onClick={() => setShowTags((prev) => !prev)}
				>
					<Label className="text-md ">Topic Tags</Label>
					<ChevronRight
						className={`w-5 h-5  tracking-all duration-300 ease-in-out  ${
							showTags ? "rotate-90" : "rotate-0"
						}`}
					/>
				</div>
				{showTags && problemDetail && (
					<div className="flex flex-row gap-3 px-2 py-2  ">
						{problemDetail.tags &&
							problemDetail?.tags.map((tag, i) => (
								<Tag key={i} name={tag} />
							))}
					</div>
				)}
			</div>
		</div>
	);
}
