import { Input, Output } from "@/client/types";

interface TestCaseProps {
	testCaseNumber: number;
	inputs: Input[]
	output: Output | null
}

export const TestCaseExample = ({ testCaseNumber, inputs, output }: TestCaseProps) => {
	return (
		<div className="flex flex-col  gap-3 w-full">
			<h1 className="text-lg font-semibold text-white">
				Example {testCaseNumber + 1}
			</h1>
			<code className="bg-gray-800  rounded-md flex  ">
				<span className=" w-1 bg-[#4ac3ab] rounded-tl-lg rounded-bl-lg"></span>
				<div className="flex flex-col gap-3 px-4 py-3  flex-1">
					<div className="flex flex-row gap-5">
						<span className="font-semibold text-[#4ac3ab] ">
							Input:
						</span>
						<span>
							{
								`${inputs.map(input => {
									return `${input.name} = ${input.value}`
								}).join(', ')}`
							}
						</span>
					</div>
					<div className="flex flex-row gap-5">
						<span className="font-semibold text-[#4ac3ab]">
							Output:
						</span>
						<span>{ `${output?.value}`}</span>
					</div>
				</div>
			</code>
		</div>
	);
};
