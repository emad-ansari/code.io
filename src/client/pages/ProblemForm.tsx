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
	deleteParameter,
	setparameterName,
	setParameterType,
} from "../features/problemFormSlice";
import {
	addNewTestCase,
	addTestCaseInput,
	removeTestCase,
	TestCaseInputType,
	removeTestCaseInput,
	setTestCaseOutputType,
	setTestCaseOutputValue,
	TestCaseOutput,
	setTestCaseInputName,
	setTestCaseInputType,
	setTestCaseInputValue,

} from "../features/TestcaseSlice";
import { useSelector } from "react-redux";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";

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

export const ProblemForm = () => {
	const dispatch = useAppDispatch();
	const { title, description, parameters } = useSelector(
		(state: RootState) => state.problemform
	);
	const { testcases } = useSelector((state: RootState) => state.TestCaseForm);
	console.log('testcases:', testcases)
	const difficultyOption: string[] = ["Easy", "Medium", "Hard"];

	const handleParameters = () => {
		const newParameter = {
			id: Date.now().toString() + Math.floor(Math.random() * 10),
			name: "",
			type: "",
		};
		dispatch(addParameter(newParameter));
	};

	const handleNewTestCase = () => {
		const newTestCase = {
			id: Date.now().toString() + Math.floor(Math.random() * 10),
			inputs: [
				{
					id: Date.now().toString() + Math.floor(Math.random() * 10),
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
									id={parameter.id}
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
									id={testcase.id}
									testcaseNo={index + 1}
									inputs={testcase.inputs}
									output = {testcase.output}
								/>
							);
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

export function TestCaseInput({
	testcaseId,
	inputId,
	name,
	type,
	value
}: {
	testcaseId: string;
	inputId: string;
	name: string,
	type: string
	value: string
}) {
	const dispatch = useAppDispatch();
	
	return (
		<div className="flex flex-row gap-2 bg-[#1f2937] px-3 py-3 rounded-md">
			<input
				type="text"
				id="input-name"
				className="text-white w-full px-3  border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] bg-darkGray"
				value={name}
				onChange={(e) =>
					dispatch(setTestCaseInputName({ testcaseId, inputId,  name: e.target.value }))
				}
				placeholder="Input name"
				required
			/>
			<Select onValueChange={(value) => dispatch(setTestCaseInputType({ testcaseId, inputId, type: value}))}>
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
			<input
				type="text"
				id="input-value"
				className="text-white w-full px-3  border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] bg-darkGray"
				value={value}
				onChange={(e) =>
					dispatch(setTestCaseInputValue({ testcaseId, inputId, value: e.target.value }))
				}
				placeholder="Value"
				required
			/>
			<MdDelete
				className=" w-20 h-8 text-red-600 hover:bg-red-100 rounded-md py-1.5 px-1.5 "
				onClick={() =>
					dispatch(removeTestCaseInput({ testcaseId, inputId }))
				}
			/>
		</div>
	);
}

export function TestCaseContainer({
	id,
	testcaseNo,
	inputs,
	output
}: {
	id: string;
	testcaseNo: number;
	inputs: TestCaseInputType[];
	output: TestCaseOutput
}) {
	const dispatch = useAppDispatch();
	console.log('testcase output: ', output);
	const handleTestCaseInput = () => {
		const newInput = {
			id: Date.now().toString() + Math.floor(Math.random() * 10),
			name: "",
			type: "",
			value: "",
		};
		dispatch(addTestCaseInput({ testcaseId: id, newInput }));
	};

	return (
		<div className="rounded-md px-3 py-3 border border-[#334155] ">
			<div className="flex justify-between items-center mb-3">
				<div className="flex flex-1 justify-end items-center">
					<span className="test-white text-gray-200 text-lg font-bold">
						TestCase {testcaseNo}
					</span>
				</div>
				<div
					className="flex flex-1 justify-end  px-1.5 cursor-pointer items-center"
					onClick={() => dispatch(removeTestCase(id))}
				>
					<MdDelete className="w-9 h-9 text-red-500 hover:bg-red-100  rounded-md px-2 p-2" />
				</div>
			</div>
			<div className="mb-4 flex flex-col gap-3">
				<label className="block text-gray-200 text-sm font-bold mb-2">
					Add TestCase Input Details
				</label>
				<Button
					classname="flex items-center justify-between bg-transparent border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] w-full hover:bg-[#ecfeff] text-[#9ca3af] hover:text-black"
					onClick={() => handleTestCaseInput()}
				>
					<span className=" text-md ">Add Testcase Input</span>
					<IoAdd className=" font-medium text-xl" />
				</Button>
				<div className="flex flex-col gap-2  border border-[#334155] rounded-md px-2 py-2">
					{inputs.map((input, index) => {
						return (
							<TestCaseInput
								key={index}
								inputId={input.id}
								testcaseId={id}
								name = {input.name}
								value = {input.value}
								type = {input.type}
							/>
						);
					})}
				</div>
			</div>
			<div className="flex flex-col justify-between  bg-[#1f2937] px-3 py-3 rounded-md border border-[#334155] ">
				<label className="block text-gray-200 text-sm font-bold mb-2">
					Output Type And Value
				</label>
				<div className="flex flex-row gap-4 ">
					<Select
						onValueChange={(value) =>
							dispatch(
								setTestCaseOutputType({
									testcaseId: id,
									outputType: value,
								})
							)
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
					<input
						type="text"
						className="text-white w-full px-3 border rounded-md focus:outline-none  focus:ring focus:ring-offset-[#81E291] bg-darkGray"
						placeholder="Value"
						value={output.value}
						onChange={(e) =>
							dispatch(
								setTestCaseOutputValue({
									testcaseId: id,
									outputValue: e.currentTarget.value,
								})
							)
						}
						required
					/>
				</div>
			</div>
		</div>
	);
}

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
