import { useState } from "react";

export const ProblemForm = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [difficulty, setDifficulty] = useState("Easy");
	const [functionName, setFunctionName] = useState("");
	const [parameters, setParameters] = useState("");
	const [returnType, setReturnType] = useState("");

	// const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const problemData = {
	// 		title,
	// 		description,
	// 		difficulty,
	// 		functionName,
	// 		parameters,
	// 		returnType,
	// 	};
	// 	console.log("Problem Submitted:", problemData);
	// 	// Add your form submission logic here
	// };

	return (
		<div className="bg-PRIMARY pt-5">
			<div className="max-w-3xl mx-auto p-8 bg-darkGray shadow-lg rounded-lg">
				<h2 className="text-2xl font-bold mb-6 text-white">
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
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter the problem title"
							required
						/>
					</div>

					<div className="mb-4">
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
							onChange={(e) => setDescription(e.target.value)}
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
							onChange={(e) => setDifficulty(e.target.value)}
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
							onChange={(e) => setFunctionName(e.target.value)}
							placeholder="Enter the function name"
							required
						/>
					</div>

					<div className="mb-4">
						<label
							className="block text-gray-200 text-sm font-bold mb-2"
							htmlFor="parameters"
						>
							Parameters
						</label>
						<input
							type="text"
							id="parameters"
							className="text-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] bg-transparent"
							value={parameters}
							onChange={(e) => setParameters(e.target.value)}
							placeholder="Enter function parameters (comma-separated)"
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
							onChange={(e) => setReturnType(e.target.value)}
							placeholder="Enter the function return type"
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
