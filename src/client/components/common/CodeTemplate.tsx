import { useState } from "react";
import { ChevronDown, ChevronLeft, Trash } from "lucide-react";
import { useAppDispatch } from "@/client/app/store";
import { LANGUAGES } from "@/client/lib/types";
import { Button } from "@/client/components/ui/button";
import {
	deleteTemplate,
	setDifficulty,
	setOutput,
	Template,
	setLanguage,
	setTemplateCode,
	setBoilerFucntion
} from "@/client/features/problemFormSlice";



import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

interface CodeTemplateProps extends Template {
	templateNo: number;
}


export const CodeTemplate: React.FC<CodeTemplateProps> = ({
	id,
	templateNo,
	template_code,
	boiler_function,
}) => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState<boolean>(false);
	console.log(template_code)

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
						<span className="text-md ">Template {templateNo}</span>
						{open ? (
							<ChevronDown className="w-4 h-4 transition-all ease-in-out" />
						) : (
							<ChevronLeft className="w-4 h-4 transition-all ease-in-out" />
						)}
					</Button>
				</div>
				{open && (
					<div className="pt-3 border-[1.5px] border-code-border rounded-bl-xl rounded-br-xl transition-all ease-in-out">
						<div className="mb-4 px-2">
							<label
								htmlFor="language"
								className="block text-gray-200 text-sm font-bold mb-2"
							>
								Language
							</label>
							<Select
								onValueChange={(value) =>
									dispatch(setLanguage({id, language: value}))
								}
							>
								<SelectTrigger className="w-full text-[#9ca3af] border-[1.5px] border-slate-800 rounded-lg  placeholder:text-gray-300  ">
									<SelectValue
										placeholder="Language"
										className="text-white  placeholder:text-gray-300 "
									/>
								</SelectTrigger>
								<SelectContent className="bg-code-dark text-white  border-[1.5px] border-code-border ">
									<SelectGroup className="">
										{LANGUAGES.map((language) => {
											return (
												<SelectItem
													value={language}
													className="hover:bg-[#334155] !important cursor-pointer"
												>
													{language}
												</SelectItem>
											);
										})}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="px-2">
							<label
								className="block text-gray-200 text-sm font-bold mb-2"
								htmlFor="template_code"
							>
								Template Code
							</label>
							<textarea
								id="template_code"
								className=" text-white text-sm w-full px-3 py-2  border-[1.5px] hover:outline-none focus:outline-none border-code-border  rounded-lg bg-transparent"
								value={template_code}
								onChange={(e) =>
									dispatch(
										setTemplateCode({
											id,
											t_code: e.target.value,
										})
									)
								}
								placeholder={"template code"}
								rows={4}
								required
							></textarea>
						</div>
						<div className="px-2 ">
							<label
								className="block text-gray-200 text-sm font-bold mb-2"
								htmlFor="template_code"
							>
								Boiler Function
							</label>
							<textarea
								id="boiler_function"
								className=" text-white text-sm w-full px-3 py-2  border-[1.5px] hover:outline-none focus:outline-none border-code-border  rounded-lg bg-transparent"
								value={boiler_function}
								onChange={(e) =>
									dispatch(
										setBoilerFucntion({
											id,
											b_function: e.target.value,
										})
									)
								}
								placeholder={`boiler function`}
								rows={4}
								required
							></textarea>
						</div>
						<div className="w-full px-2 mb-2 mt-2">
							<Button
								className="flex items-center bg-red-500 space-x-2 w-full hover:bg-red-600"
								onClick={() => dispatch(deleteTemplate(id))}
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
