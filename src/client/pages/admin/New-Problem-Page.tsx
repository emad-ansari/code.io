import { useSelector } from "react-redux";
import { RootState } from "@/client/app/store";
import { Wand } from "lucide-react";
import { Button } from "@/client/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/client/components/ui/tooltip";

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/client/components/ui/tabs";

import { TestCaseForm } from "./TestCaseForm";
import { ProblemForm } from "./ProblemForm";
import { CodeTemplateForm } from "./CodeTemplateForm";


const NewProblemPage = () => {
	const { isLogin } = useSelector((state: RootState) => state.user);

	return (
		<main>
			<div className="flex gap-2 justify-between">
				<Tabs defaultValue="problem" className="flex-1 ">
					<TabsList className="rounded-full border-[1.5px] border-code-border ">
						<TabsTrigger value="problem">Problem</TabsTrigger>
						<TabsTrigger value="testcases">Testcases</TabsTrigger>
						<TabsTrigger value="template">
							Code Templates
						</TabsTrigger>
					</TabsList>
					<TabsContent value="problem">
						<ProblemForm />
					</TabsContent>
					<TabsContent value="testcases">
						<TestCaseForm />
					</TabsContent>
					<TabsContent value="template">
						<CodeTemplateForm />
					</TabsContent>
				</Tabs>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								// disabled={isLogin ? false : true}
								type="submit"
								className="bg-green-800/20 text-green-500 font-medium px-4 h-11 rounded-full cursor-pointer gap-2 shadow-md "
								// onClick={() =>
								// 	dispatch(createProblem())
								// }
							>
								<Wand className="w-5 h-5"/>
								Create Problem
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-white">
								{isLogin
									? ""
									: "You are not logged in, please login "}
							</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</main>
	);
};
export default NewProblemPage;
