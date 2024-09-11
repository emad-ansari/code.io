import { useAppDispatch, RootState } from "../app/store";
import { Button } from "../components/common/Button";
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";

export const ProblemForm = () => {
	const dispatch = useAppDispatch();
	const {
		title,
		description,
		difficulty,
		functionName,
		parameters,
		returnType,
	} = useSelector((state: RootState) => state.problemform);
	console.log(
		title,
		description,
		difficulty,
		functionName,
		parameters,
		returnType
	);

	const typeOptions: string[] = [
		"int",
		"int[]",
		"int[][]",
		"char",
		"char[]",
		"char[][]",
		"String",
		"String[]",
		"String[][]",
		"boolean",
		"boolean[]",
		"boolean[][]",
		"float",
		"float[]",
		"double",
		"double[]",
		"List<Integer>",
		"List<List<Integer>>",
		"List<String>",
		"List<List<String>>",
	];

	return (
		<div className="bg-PRIMARY fixed top-16 bottom-0 left-0 right-0 flex flex-row justify-between gap-5 pl-4 pr-4 pb-4">
			<div className="max-w-3xl mx-auto pt-8 pl-8 pr-8 pb-20 bg-darkGray shadow-lg rounded-lg  border border-[#334155]  flex flex-1 flex-col overflow-y-scroll">
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
							onChange={(e) =>
								dispatch(setDescription(e.target.value))
							}
							placeholder="Describe the problem in detail"
							rows={5}
							required
						></textarea>
					</div>

					<div className="mb-4">
						<label htmlFor="Difficulty" className="block text-gray-200 text-sm font-bold mb-2">Difficulty</label>
						<Select >
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select a timezone" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup className="bg-transparent">
									<SelectItem value="easy" className="bg-transparent">
										Easy
									</SelectItem>
									<SelectItem value="medium">
										Medium
									</SelectItem>
									<SelectItem value="hard">
										Hard
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
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
							onChange={(e) =>
								dispatch(setFunctionName(e.target.value))
							}
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
						<select
							name="type"
							// value={param.type}
							id="returnType"
							// onChange={(e) => handleInputChange(index, e)}
							className=" text-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] bg-transparent"
						>
							{typeOptions.map((option) => (
								<option
									key={option}
									value={option}
									className="text-white bg-darkGray"
								>
									{option}
								</option>
							))}
						</select>
					</div>
					<div className="mb-4">
						<Button classname="flex items-center justify-between bg-transparent border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] w-full">
							<span className="text-white text-md ">
								Add Test Case example
							</span>
							<IoAdd className="text-white font-medium text-lg" />
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
							onChange={(e) =>
								dispatch(setParameters(e.target.value))
							}
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
			<div className="text-white flex flex-1 bg-darkGray shadow-lg rounded-lg  border border-[#334155] ">
				<h1>Example</h1>
			</div>
		</div>
	);
};
