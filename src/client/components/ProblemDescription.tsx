import { TestCase } from "../components/TestCase";
import { testcase } from "../../utils/testcase";
import { Button } from "./Button";

export const ProblemDescription = () => {
	return (
		<section className="rounded-lg bg-darkGray  text-white border border-gray-500 ">
			<div className="flex items-center bg-[#1f2937] px-2 py-1 rounded-tl-lg rounded-tr-lg gap-5 border border-gray-500">
				<Button classname="bg-darkGray text-white rounded-md">
					<span>Description</span>
				</Button>

				<Button classname="bg-darkGray text-white rounded-md">
					<span>Submissons</span>
				</Button>
			</div>
			<div className="px-5 pb-3 overflow-y-scroll scroll-smooth h-[93%]">
				<div className="flex flex-col gap-[28px] pt-5 ">
					how to create markdow for test cases 🤔?
				</div>
				<div className="flex flex-col gap-8 ">
					{testcase.map((testcase, index) => {
						return (
							<TestCase
								key={testcase.id}
								testCaseNumber={index}
								input={testcase.input}
								output={testcase.output}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
};
