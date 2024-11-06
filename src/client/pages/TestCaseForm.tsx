import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { IoAdd } from "react-icons/io5";

import { useAppDispatch, RootState } from "@/client/app/store";
import { TestCaseContainer } from "@/client/components/common/TestCaseContainer";
import { Button } from "@/client/components/common/Button";
import { addNewTestCase, setProblemTitle } from "@/client/features/TestcaseSlice";

export const TestCaseForm = () => {
	const dispatch = useAppDispatch();
	const { problemTitle, testcases} = useSelector((state: RootState) => state.TestCaseForm);
	

  const handleNewTestCase = () => {
		const newTestCase = {
			testcaseId: uuidv4(),
			inputs: [
				{
					inputId: uuidv4(),
					name: "",
					type: "",
					value: "",
				},
			],
			output: {
				type: "",
				value: "",
			},
		};
		dispatch(addNewTestCase(newTestCase));
	};
  
	return (
		<div className="bg-PRIMARY fixed top-32 bottom-0 left-0 right-0 flex flex-row justify-between gap-5 pl-4 pr-4 pb-4">
			<div className="max-w-3xl mx-auto pt-8 pl-8 pr-8 pb-20 bg-darkGray shadow-lg rounded-lg  border border-[#334155]  flex flex-1 flex-col overflow-y-scroll">
				<h2 className="text-2xl font-bold mb-4 text-white">
					Add New Test Case Here
				</h2>
				<div>
					<div className="mb-4">
						<label
							className="block text-gray-200 text-sm font-bold mb-2"
							htmlFor="title"
						>
							Problem Title
						</label>
						<input
							type="text"
							id="title"
							className="w-full px-3 py-2 border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] bg-transparent text-white"
							value={problemTitle}
							onChange={(e) => dispatch(setProblemTitle(e.target.value))}
							placeholder="Enter the problem title"
							required
						/>
					</div>

					<div className="mb-4">
						<label
							className="block text-gray-200 text-sm font-bold mb-2"
							htmlFor="testcase"
						>
							Add Test Case Exmaples
						</label>
						<Button
							classname="flex items-center justify-between bg-transparent border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] w-full hover:bg-[#ecfeff] text-[#9ca3af] hover:text-black"
							onClick={() => handleNewTestCase()}
						>
							<span className="text-md ">Add new TestCase</span>
							<IoAdd className="font-medium text-xl" />
						</Button>
					</div>
					<div className="mb-4 flex flex-col gap-2">
						{testcases.map((testcase, index) => {
							return (
								<TestCaseContainer
									key={index}
									id={testcase.testcaseId}
									testcaseNo={index + 1}
									inputs={testcase.inputs}
									output={testcase.output}
								/>
							);
						})}
					</div>

					<div className="flex justify-end">
						<button
							type="submit"
							className="bg-cyan text-black font-medium px-4 py-2 rounded-md hover:bg-[#a5f3fc] focus:outline-none  focus:ring focus:ring-offset-[#81E291]"
						>
							Submit Problem
						</button>
					</div>
				</div>
			</div>
			<div className="text-white flex flex-1 bg-darkGray shadow-lg rounded-lg  border border-[#334155] ">
				<h1>Example</h1>
			</div>
		</div>
	);
};
