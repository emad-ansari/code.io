import { useState } from "react";
import { ChevronDown, ChevronLeft, Trash } from "lucide-react";

import { useAppDispatch } from "@/client/app/store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
	deleteTestcase,
	setTestcasesOutput,
	setTestcasesInput,
} from "@/client/features/problemFormSlice";

interface TestcaseContainerProps {
	id: string;
	testcaseNo: number;
	input: string;
	output: string;
}

export const TestCaseContainer: React.FC<TestcaseContainerProps> = ({
	id,
	testcaseNo,
	input,
	output,
}) => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState<boolean>(false);

	return (
		<>
			<div className="rounded-xl flex flex-col">
				<div className={`${open ? "" : ""}`}>
					<Button
						className={`bg-slate-800  flex items-center h-11 justify-between  border-[1.5px] border-slate-800  w-full ${
							open
								? "rounded-tl-xl rounded-tr-xl rounded-bl-none rounded-br-none"
								: "rounded-xl"
						} transition-all ease-in-out `}
						onClick={() => setOpen((prev) => !prev)}
					>
						<span className="text-md ">Testcase {testcaseNo}</span>
						{open ? (
							<ChevronDown className="w-4 h-4 transition-all ease-in-out" />
						) : (
							<ChevronLeft className="w-4 h-4 transition-all ease-in-out" />
						)}
					</Button>
				</div>
				{open && (
					<div className="pt-3 border-[1.5px] border-slate-800 rounded-bl-xl rounded-br-xl transition-all ease-in-out">
						<div className="px-2 ">
							<label
								className="block text-gray-200 text-sm font-bold mb-2"
								htmlFor="title"
							>
								Input
							</label>
							<Input
								type="text"
								placeholder="nums = [1, 2, 3, 4], target = 5"
								className="focus:outline-none hover:outline-none  placeholder:text-gray-400  border-[1.5px] border-slate-800 rounded-lg"
								value={input}
								onChange={(e) =>
									dispatch(
										setTestcasesInput({
											id,
											input: e.target.value,
										})
									)
								}
								required
							/>
						</div>
						<div className="px-2 ">
							<label
								className="block text-gray-200 text-sm font-bold mb-2"
								htmlFor="title"
							>
								Output
							</label>
							<Input
								type="text"
								placeholder="[1, 2]"
								className="focus:outline-none hover:outline-none  placeholder:text-gray-400  border-[1.5px] border-slate-800 rounded-lg"
								value={output}
								onChange={(e) =>
									dispatch(
										setTestcasesOutput({
											id,
											output: e.target.value,
										})
									)
								}
								required
							/>
						</div>
						<div className="w-full px-2 mb-2 mt-2">
							<Button
								className="flex items-center bg-red-500 space-x-2 w-full hover:bg-red-600"
								onClick={() => dispatch(deleteTestcase(id))}
							>
								<Trash className="w-4 h-4 " />
								<span className="font-semibold">Delete</span>
							</Button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};
