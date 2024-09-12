import { useAppDispatch, RootState } from "../app/store";
import { Button } from "../components/common/Button";
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import {
	setTitle,
	setDescription,
	setDifficulty,
	addParameter,
	setReturnType,
	deleteParameter
} from "../features/problemFormSlice";

import { useSelector } from "react-redux";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	// SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";

export const ProblemForm = () => {
	const dispatch = useAppDispatch();
	const {
		title,
		description,
		difficulty,
		parameters,
		returnType,
	} = useSelector((state: RootState) => state.problemform);


	const difficultyOption: string[] = ["Easy", "Medium", "Hard"];

	const handleParameters = () => {
		const newParameter = {
			id: Date.now().toString() + Math.floor(Math.random() * 10),
			name: "",
			type: ""
		}
		dispatch(addParameter(newParameter))
	}

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
						<label
							htmlFor="Difficulty"
							className="block text-gray-200 text-sm font-bold mb-2"
						>
							Difficulty
						</label>
						<Select>
							<SelectTrigger className="w-full text-[#9ca3af]">
								<SelectValue
									placeholder="Difficulty level"
									className="text-white"
								/>
							</SelectTrigger>
							<SelectContent className="bg-darkGray text-white">
								<SelectGroup className="">
									{difficultyOption.map(
										(difficulty, index) => {
											return (
												<SelectItem
													key={index}
													value="easy"
													className="hover:bg-[#334155] !important cursor-pointer"
												>
													{difficulty}
												</SelectItem>
											);
										}
									)}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-200 text-sm font-bold mb-2"
							htmlFor="returnType"
						>
							Function Return Type
						</label>
						<CustomSelectTypes />
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-200 text-sm font-bold mb-2"
							htmlFor="testcase"
						>
							Add Parameters name and return type
						</label>
						<Button
							classname="flex items-center justify-between bg-transparent border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] w-full"
							onClick={() => handleParameters()}
						>
							<span className="text-[#9ca3af] text-md ">
								Add new Prameter
							</span>
							<IoAdd className="text-[#9ca3af] font-medium text-xl" />
						</Button>
					</div>
					<div className="mb-4 flex flex-col gap-2">
						{parameters.map((parameter, index) => {
							return <ParameterCotnainer key={index} id= {parameter.id} />;
						})}
					</div>

					<div className="flex justify-end">
						{/* <button
							type="submit"
							className="bg-cyan text-black font-medium px-4 py-2 rounded-md hover:bg-[#a5f3fc] focus:outline-none  focus:ring focus:ring-offset-[#81E291]"
						>
							Submit Problem
						</button> */}
					</div>
				</div>
			</div>
			<div className="text-white flex flex-1 bg-darkGray shadow-lg rounded-lg  border border-[#334155] ">
				<h1>Example</h1>
			</div>
		</div>
	);
};

function TestCaseContainer() {
	return <div></div>;
}

function ParameterCotnainer({ id }: {id: string}) {
	const dispatch = useAppDispatch();

	

	return (
		<div className="flex flex-row gap-2 bg-[#1f2937] px-3 py-3 rounded-md ">
			<div className="flex flex-1">
				<CustomSelectTypes />
			</div>

			<div className="flex flex-1">
				<input
					type="text"
					id="testcase"
					className="text-white w-full px-3  border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] bg-darkGray"
					value={""}
					// onChange={(e) => dispatch(setParameters(e.target.value))}
					placeholder="Name"
					required
				/>
			</div>
			<div className="flex items-center cursor-pointer bg-darkGray px-1.5 rounded-lg" onClick = {() => dispatch(deleteParameter({ id }))} >	
				<MdDelete className=" text-white w-5 h-5 "/>
			</div>
		</div>
	);
}

function CustomSelectTypes() {
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
		<Select>
			<SelectTrigger className="w-full text-[#9ca3af] bg-darkGray">
				<SelectValue placeholder="Type" className="text-white" />
			</SelectTrigger>
			<SelectContent className="bg-darkGray text-white">
				<SelectGroup className="">
					{typeOptions.map((type, index) => {
						return (
							<SelectItem
								key={index}
								value={type}
								className="cursor-pointer"
							>
								{type}
							</SelectItem>
						);
					})}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

