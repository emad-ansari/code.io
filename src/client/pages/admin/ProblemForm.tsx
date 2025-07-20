import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../../app/store";
import { X } from "lucide-react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import {
	addNewTag,
	removeTag,
	setDescription,
	setDifficulty,
	setTitle,
} from "@/client/features/problemFormSlice";

export const ProblemForm = () => {
	const dispatch = useAppDispatch();
	const { category, title, description, tags } = useSelector(
		(state: RootState) => state.problemform
	);
	const [tagName, setTagName] = useState<string>("");

	return (
		<div className="flex flex-row justify-between gap-3  ">
			<div className="max-w-3xl  shadow-lg rounded-2xl  border-[1.5px] border-slate-800  flex flex-1 flex-col">
				<div className="bg-slate-800 flex items-center px-5 py-4 rounded-tl-2xl rounded-tr-2xl">
					<h2 className="text-2xl font-bold text-white">
						Add New Problem
					</h2>
				</div>
				<div className=" pt-4 px-4 pb-20">
					<div className="mb-4">
						<label
							className="block text-gray-200 text-sm font-bold mb-2"
							htmlFor="title"
						>
							Problem Category
						</label>
						<Input
							type="text"
							placeholder="Category Name"
							className="focus:outline-none hover:outline-none  placeholder:text-gray-300  border-[1.5px] border-slate-800 rounded-lg"
							value={category}
							onChange={(e) => dispatch(setTitle(e.target.value))}
							required
						/>
					</div>
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
					<div className="mb-4">
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
					<div className="mb-4">
						<div className="mb-4">
							<label
								className="block text-gray-200 text-sm font-bold mb-2"
								htmlFor="title"
							>
								Tag
							</label>
							<Input
								required
								placeholder="Enter tag name"
								className="border-[1.5px] border-code-border outline-none  bg-transparent"
								value={tagName}
								onChange={(e) => setTagName(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										dispatch(addNewTag(tagName));
										setTagName("");
									}
								}}
							/>
						</div>
						<div className="flex flex-row gap-2">
							{tags.map((tag, index) => {
								return <Tag key={index} tagName={tag} />;
							})}
						</div>
					</div>
				</div>
			</div>
			{/* <TestCaseForm /> */}
		</div>
	);
};

const Tag = ({ tagName }: { tagName: string }) => {
	const dispatch = useAppDispatch();
	return (
		<div className="bg-slate-800 rounded-full px-3 py-2 text-xs flex gap-3 items-cetner text-white justify-center font-medium cursor-pointer ">
			<span className="flex items-center text-code-orange">
				{tagName}
			</span>
			<span
				className="bg-slate-700  w-4 h-4 rounded-full flex items-center justify-center"
				onClick={() => dispatch(removeTag({ tagName }))}
			>
				<X className="w-3 h-3 rounded-full" />
			</span>
		</div>
	);
};
