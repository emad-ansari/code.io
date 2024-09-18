import { useAppDispatch, RootState } from "../app/store";
import { Button } from "../components/common/Button";
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { TestCaseContainer } from "../components/common/TestCaseContainer";
import { ContributionExample } from "../components/common/ContributionExample";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../components/ui/tooltip";

import {
	setTitle,
	setDescription,
	setDifficulty,
	addParameter,
	setReturnType,
	deleteParameter,
	setparameterName,
	setParameterType,
	createProblem,
} from "../features/problemFormSlice";
import { addNewTestCase } from "../features/TestcaseSlice";
import { useSelector } from "react-redux";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";
import { typeOptions } from "../types";
import { v4 as uuidv4 } from "uuid";

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const ProblemForm = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const dispatch = useAppDispatch();
	const { title, description, parameters } = useSelector(
		(state: RootState) => state.problemform
	);
	const { testcases } = useSelector((state: RootState) => state.TestCaseForm);
	const { isLogin } = useSelector((state: RootState) => state.user);
	
	const difficultyOption: string[] = ["Easy", "Medium", "Hard"];

	const handleParameters = () => {
		const newParameter = {
			parameterId: uuidv4(),
			name: "",
			type: "",
		};
		dispatch(addParameter(newParameter));
	};

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
		<div className="bg-PRIMARY  flex flex-row justify-between gap-5 pl-4 pr-4 pb-4 fixed top-32 left-0 right-0 bottom-0">
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
						<Select
							onValueChange={(value) =>
								dispatch(setDifficulty(value))
							}
						>
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
													value={difficulty}
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
						<Select
							onValueChange={(value) =>
								dispatch(setReturnType(value))
							}
						>
							<SelectTrigger className="w-full text-[#9ca3af] bg-darkGray">
								<SelectValue
									placeholder="Type"
									className="text-white"
								/>
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
					</div>
					<div className="mb-4">
						<label className="block text-gray-200 text-sm font-bold mb-2">
							Add Parameters name and return type
						</label>
						<Button
							classname="flex items-center justify-between bg-transparent border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] w-full hover:bg-[#ecfeff] text-[#9ca3af] hover:text-black"
							onClick={() => handleParameters()}
						>
							<span className="text-md ">Add new Parameter</span>
							<IoAdd className="font-medium text-xl" />
						</Button>
					</div>
					<div className="mb-4 flex flex-col gap-2">
						{parameters.map((parameter, index) => {
							return (
								<ParameterCotnainer
									key={index}
									id={parameter.parameterId}
									name={parameter.name}
								/>
							);
						})}
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
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										disabled={
											localStorage.getItem("CToken")
												? false
												: true
										}
										type="submit"
										className="bg-cyan text-black font-medium px-4 py-2 rounded-md hover:bg-[#a5f3fc] focus:outline-none "
										onClick={() => dispatch(createProblem())}
									>
										Submit Problem
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>{isLogin ? "" : "You are not logged in, please login "}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			</div>

			<div className="text-white flex flex-1 bg-darkGray shadow-lg rounded-lg  border border-[#334155] ">
				<ContributionExample />
			</div>
		</div>
	);
};

function ParameterCotnainer({ id, name }: { id: string; name: string }) {
	const dispatch = useAppDispatch();

	return (
		<div className="flex flex-row gap-2 bg-[#1f2937] px-3 py-3 rounded-md ">
			<div className="flex flex-1">
				<CustomSelectTypes id={id} />
			</div>

			<div className="flex flex-1">
				<input
					type="text"
					id="testcase"
					className="text-white w-full px-3  border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] bg-darkGray"
					value={name}
					onChange={(e) =>
						dispatch(setparameterName({ id, name: e.target.value }))
					}
					placeholder="Name"
					required
				/>
			</div>
			<div
				className="flex items-center cursor-pointer bg-darkGray px-1.5 rounded-lg"
				onClick={() => dispatch(deleteParameter({ id }))}
			>
				<MdDelete className=" text-white w-5 h-5 " />
			</div>
		</div>
	);
}

function CustomSelectTypes({ id }: { id: string }) {
	const dispatch = useAppDispatch();

	return (
		<Select
			onValueChange={(value) =>
				dispatch(setParameterType({ id, type: value }))
			}
		>
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
