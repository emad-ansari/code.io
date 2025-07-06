import { Separator } from "@/client/components/ui/separator";
import { CircleCheckBig, Target, ThumbsDown, ThumbsUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import { Components } from "react-markdown";

import problemStatementMarkdown from "@/problem.md?raw";

const problem = {
	problemNo: 1,
	title: "Two Sum",
	difficulty: "Easy",
	status: "Solved",
	description: "",
	likes: 20,
};

export default function ProblemStatement() {
	// const { title } = useParams();

	const isLogin = true;
	const loading = false;

	// const { isLogin } = useSelector((state: RootState) => state.user);
	// const { problemDetail, loading } = useSelector(
	// 	(state: RootState) => state.problem
	// );
	// const {
	// 	description,
	// 	problemNo,
	// 	difficulty,
	// 	problemStatus,
	// 	testcaseExamples,
	// } = problemDetail;

	// const dispatch = useAppDispatch();
	// useEffect(() => {
	// 	if (title) {
	// 		const formattedTitle = title.replace(/-/g, " ");
	// 		dispatch(fetchProblemDetail({ title: formattedTitle }));
	// 	} else {
	// 		console.log("problem title is undefined");
	// 	}
	// }, []);

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
				<pre className="flex flex-col bg-code-dark rounded-md  py-1  overflow-x-auto" {...props}>
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
		<div className="flex flex-col gap-4 px-5 pb-3 overflow-y-scroll scroll-smooth h-[93%]">
			<div className="flex flex-col gap-5 pt-5 ">
				<div className="flex flex-row items-center justify-between">
					<span className="flex gap-2 text-[26px] font-semibold">
						<span>1.</span>
						<span className="text-white">Two Sum</span>
					</span>
					<div className="flex flex-row gap-4">
						<div className="flex items-center justify-between gap-3 bg-code-dark rounded-full px-3 py-1 ">
							<div className="flex items-center justify-between gap-2 cursor-pointer text-gray-300">
								<ThumbsUp size={16} />
								<span>{problem.likes}</span>
							</div>
							<Separator
								orientation="vertical"
								className="bg-gray-700"
							/>
							<div className="flex items-center text-gray-300 cursor-pointer">
								<ThumbsDown size={16} />
							</div>
						</div>
						{
							<span
								className={`font-normal text-sm flex items-center justify-center bg-code-dark px-3 py-1 rounded-full ${
									problem.difficulty == "Easy"
										? "text-[#4ac3ab]"
										: problem.difficulty == "Medium"
										? "text-codeio_yellow"
										: "text-codeio_red"
								} `}
							>
								{problem.difficulty}
							</span>
						}

						{isLogin && !loading && problem?.status !== "Todo" && (
							<div className="flex flex-row gap-1.5 items-center  bg-code-dark rounded-full px-3 py-1">
								<span className="text-sm">
									{problem.status}
								</span>
								<span className="flex items-center">
									{problem.status === "Solved" ? (
										<CircleCheckBig
											size={16}
											absoluteStrokeWidth
											className="text-[#4ac3ab]"
										/>
									) : problem.status === "Attempted" ? (
										<Target
											size={16}
											absoluteStrokeWidth
											className="text-codeio_yellow"
										/>
									) : null}
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="prose prose-invert max-w-none dark:prose-dark-mode">
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeSanitize]}
					components={customComponents}
				>
					{problemStatementMarkdown}
				</ReactMarkdown>
			</div>
		</div>
	);
}
