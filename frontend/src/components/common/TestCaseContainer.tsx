import { useState } from "react";
import { ChevronDown, ChevronLeft, Trash } from "lucide-react";

import { useAppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
	deleteTestcase,
	setInput,
	setIsSample,
	setOutput,
} from "@/features/problemSlice";
import { Testcase } from "@/lib/types";

interface TestcaseContainerProps extends Testcase {
	testcaseNo: number;
}

export const TestCaseContainer: React.FC<TestcaseContainerProps> = ({
	id,
	testcaseNo,
	input,
	expected_output,
	isSample,
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
					<div className="pt-3 border-[1.5px] border-code-border rounded-bl-xl rounded-br-xl transition-all ease-in-out">
						<div className="px-2 ">
							<label
								className="block text-gray-200 text-sm font-bold mb-2"
								htmlFor="title"
							>
								Input
							</label>
							<textarea
								id="description"
								className=" text-white text-sm w-full px-3 py-2  border-[1.5px] hover:outline-none focus:outline-none border-code-border  rounded-lg bg-transparent"
								value={input}
								onChange={(e) =>
									dispatch(
										setInput({
											id,
											input: e.target.value,
										})
									)
								}
								placeholder={`5\n1 2 3 4 5`}
								rows={4}
								required
							></textarea>
						</div>
						<div className="px-2 ">
							<label
								className="block text-gray-200 text-sm font-bold mb-2"
								htmlFor="output"
							>
								Output
							</label>
							<textarea
								id="output"
								className=" text-white text-sm w-full px-3 py-2  border-[1.5px] hover:outline-none focus:outline-none border-code-border  rounded-lg bg-transparent"
								value={expected_output}
								onChange={(e) =>
									dispatch(
										setOutput({
											id,
											output: e.target.value,
										})
									)
								}
								placeholder={`10`}
								rows={2}
								required
							></textarea>
						</div>
						<div className="px-2 flex items-center gap-4 mt-2 ">
							<Checkbox
								className="text-code-orange font-bold"
								checked={isSample}
								onCheckedChange={(checked) => {
									if (typeof checked == 'boolean') {
										dispatch(
											setIsSample({
												id,
												isSample: checked,
											})
										);
									}
									
								}}
							/>
							<span className="text-sm font-normal text-gray-300">
								Sample Testcase
							</span>
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
