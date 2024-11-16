import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, RootState } from "../app/store";
import { Button } from "../components/common/Button";
import { IoAdd } from "react-icons/io5";

import { TestCaseContainer } from "../components/common/TestCaseContainer";
import { ContributionExample } from "../components/common/ContributionExample";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../components/ui/tooltip";
import { Input } from "../components/ui/input";

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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";
import { typeOptions } from "../lib/types";
import { TestCaseForm } from "./TestCaseForm";

const ProblemForm = () => {
	const dispatch = useAppDispatch();
	const { title, description } = useSelector(
		(state: RootState) => state.problemform
	);
	
	const { isLogin } = useSelector((state: RootState) => state.user);

	const handleParameters = () => {
		const newParameter = {
			parameterId: uuidv4(),
			name: "",
			type: "",
		};
		dispatch(addParameter(newParameter));
	};



	return (
		<div className="flex flex-row justify-between gap-4  ">
			<div className="max-w-3xl  shadow-lg rounded-2xl  border-[1.5px] border-slate-800   flex flex-1 flex-col">
				<div className="bg-slate-800 flex items-center px-5 py-4 rounded-tl-2xl rounded-tr-2xl">
					<h2 className="text-2xl font-bold text-slate-200">
						Add New Problem
					</h2>
				</div>
				<div className=" pt-4 px-4 pb-20">
					<div className="mb-4">
						<label
							className="block text-gray-200 text-sm font-bold mb-2"
							htmlFor="title"
						>
							Problem Title
						</label>
						<Input
							type="text"
							placeholder="problem title"
							className="focus:outline-none hover:outline-none  placeholder:text-gray-300  border-[1.5px] border-slate-800 rounded-lg"
							value={title}
							onChange={(e) => dispatch(setTitle(e.target.value))}
							required
						/>
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
							<SelectTrigger className="w-full text-[#9ca3af] border-[1.5px] border-slate-800 rounded-lg  placeholder:text-gray-300  ">
								<SelectValue
									placeholder="Difficulty"
									className="text-white  placeholder:text-gray-300 "
								/>
							</SelectTrigger>
							<SelectContent className="bg-slate-900 text-white  border-[1.5px] border-slate-700 ">
								<SelectGroup className="">
									<SelectItem
										value={"Easy"}
										className="hover:bg-[#334155] !important cursor-pointer"
									>
										Easy
									</SelectItem>
									<SelectItem
										value={"Medium"}
										className="hover:bg-[#334155] !important cursor-pointer"
									>
										Medium
									</SelectItem>
									<SelectItem
										value={"Hard"}
										className="hover:bg-[#334155] !important cursor-pointer"
									>
										Hard
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
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
							className=" text-white w-full px-3 py-2  border-[1.5px] hover:outline-none focus:outline-none border-slate-800  rounded-lg bg-transparent"
							value={description}
							onChange={(e) =>
								dispatch(setDescription(e.target.value))
							}
							placeholder="Describe the problem in detail"
							rows={5}
							required
						></textarea>
					</div>
					<div className="flex justify-end">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										disabled={isLogin ? false : true}
										type="submit"
										className="bg-cyan text-black font-medium px-4 py-2 rounded-md hover:bg-[#a5f3fc] focus:outline-none "
										onClick={() =>
											dispatch(createProblem())
										}
									>
										Submit Problem
									</button>
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
				</div>
			</div>
			<TestCaseForm />
		</div>
	);
};



export function CustomSelectTypes({ id }: { id: string }) {
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

export default ProblemForm;

{
	/* <div className="mb-4">
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
					</div> */
}

{
	/* <div className="mb-4">
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
					</div> */
}
{
	
}
