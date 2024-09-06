import { useAppDispatch, RootState } from "../app/store";
import { Button } from "../components/Button";
import { IoAdd } from "react-icons/io5";
import {
	setTitle,
	setDescription,
	setFunctionName,
	setDifficulty,
	setParameters,
	setReturnType,
} from "../features/problemFormSlice";
import { useSelector } from "react-redux";

export const ProblemForm = () => {
	const dispatch = useAppDispatch();
	const { title, description, difficulty, functionName, parameters, returnType } = useSelector((state: RootState) => state.problemform);
	console.log(title, description, difficulty, functionName, parameters, returnType);

	return (
		<div className="bg-PRIMARY fixed top-16 bottom-0 left-0 right-0">
			<div className="max-w-3xl mx-auto pt-8 pl-8 pr-8 pb-5 bg-darkGray shadow-lg rounded-lg  border border-[#334155]">
				<h2 className="text-2xl font-bold mb-4 text-white">
					Add New Problem
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
							value={title}
							onChange={(e) => dispatch(setTitle(e.target.value))}
							placeholder="Enter the problem title"
							required
						/>
					</div>

					<div className="mb-3">
						<label
							className="block text-gray-200 text-sm font-bold mb-2"
							htmlFor="description"
						>
							Description
						</label>
						<textarea
							id="description"
							className=" text-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] bg-transparent"
							value={description}
							onChange={(e) => dispatch(setDescription(e.target.value))}
							placeholder="Describe the problem in detail"
							rows={5}
							required
						></textarea>
					</div>

					<div className="mb-4">
						<label
							className="block text-gray-200 text-sm font-bold mb-2"
							htmlFor="difficulty"
						>
							Difficulty Level
						</label>
						<select
							id="difficulty"
							className=" text-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] bg-transparent"
							value={difficulty}
							onChange={(e) => dispatch(setDifficulty(e.target.value))}
						>
							<option
								className="text-white bg-darkGray"
								value="Easy"
							>
								Easy
							</option>
							<option
								className="text-white bg-darkGray"
								value="Medium"
							>
								Medium
							</option>
							<option
								className="text-white bg-darkGray"
								value="Hard"
							>
								Hard
							</option>
						</select>
					</div>

					<div className="mb-4">
						<label
							className="block text-gray-200 text-sm font-bold mb-2"
							htmlFor="functionName"
						>
							Function Name
						</label>
						<input
							type="text"
							id="functionName"
							className="text-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] bg-transparent"
							value={functionName}
							onChange={(e) => dispatch(setFunctionName(e.target.value))}
							placeholder="Enter the function name"
							required
						/>
					</div>


					<div className="mb-4">
						<label
							className="block text-gray-200 text-sm font-bold mb-2"
							htmlFor="returnType"
						>
							Function Return Type
						</label>
						<input
							type="text"
							id="returnType"
							className="text-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] bg-transparent"
							value={returnType}
							onChange={(e) => dispatch(setReturnType(e.target.value))}
							placeholder="Enter the function return type"
							required
						/>
					</div>
					<div className="mb-4">
						<Button classname = "flex items-center justify-between bg-transparent border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] w-full">
							<span className="text-white text-md ">Add Test Case example</span>
							<IoAdd className="text-white font-medium text-lg"/>
						</Button>
						
					</div>
					
					<div className="mb-4">
						<label
							className="block text-gray-200 text-sm font-bold mb-2"
							htmlFor="testcase"
						>
							TestCase Example
						</label>
						<input
							type="text"
							id="testcase"
							className="text-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] bg-transparent"
							value={parameters}
							onChange={(e) => dispatch(setParameters(e.target.value))}
							placeholder="Enter function parameters (comma-separated)"
							required
						/>
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
		</div>
	);
};
