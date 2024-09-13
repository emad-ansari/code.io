import { useAppDispatch } from "@/client/app/store";
import { addTestCaseInput, removeTestCase, removeTestCaseInput, setTestCaseInputName, setTestCaseInputType, setTestCaseInputValue, setTestCaseOutputType, setTestCaseOutputValue, TestCaseInputType, TestCaseOutput } from "@/client/features/TestcaseSlice";
import { typeOptions } from "@/client/types";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Button } from "./Button";

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


export function TestCaseInput({
	testcaseId,
	inputId,
	name,
	value
}: {
	testcaseId: string;
	inputId: string;
	name: string,
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
