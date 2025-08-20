import { useState } from "react";
import { useSelector } from "react-redux";
import { Loader, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CategoryCard } from "./CategoryCard";

import {
	addNewTag,
	removeTag,
	setCategoryName,
	setCategoryTitle,
	createCategory,
} from "@/features/problemCategorySlice";
import { RootState, useAppDispatch } from "@/app/store";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const ProblemCategoryPage = () => {
	const dispatch = useAppDispatch();

	const { tags, name, title, categories, loading } = useSelector(
		(state: RootState) => state.problem_category
	);
	const [formData, setFormData] = useState<FormData | null>(null);

	const [tagName, setTagName] = useState<string>("");

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file) return;
		const newFormData = new FormData();
		newFormData.append("file", file);
		newFormData.append("upload_preset", uploadPreset);
		setFormData(newFormData);
	};

	return (
		<div className="h-full">
			<div className="flex items-center justify-end">
				<Dialog>
					<DialogTrigger>
						<Button className="flex gap-2 bg-green-800/20 text-green-500 items-center cursor-pointer rounded-full ">
							<Plus className="w-5 h-5" />
							Add Problem Category
						</Button>
					</DialogTrigger>
					<DialogContent className="bg-code-bg text-gray-300 border border-code-border">
						<DialogHeader>
							<DialogTitle className="text-code-orange">
								Add New Problem Category
							</DialogTitle>
							<div className="mt-4 flex flex-col gap-4">
								<div className="flex flex-col gap-2">
									<Label className="">Category Name</Label>
									<Input
										required
										placeholder="Math"
										value={name}
										className="border-[1.5px] border-code-border outline-none  bg-transparent"
										onChange={(e) =>
											dispatch(
												setCategoryName(e.target.value)
											)
										}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<Label className="">Title</Label>
									<Input
										required
										placeholder="Math"
										value={title}
										className="border-[1.5px] border-code-border outline-none  bg-transparent"
										onChange={(e) =>
											dispatch(
												setCategoryTitle(e.target.value)
											)
										}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<Label className="">Image Url</Label>
									<Input
										required
										type="file"
										accept="image/*"
										placeholder="Image Link"
										className="border-[1.5px] border-code-border outline-none  bg-transparent"
										onChange={(e) => handleFileUpload(e)}
									/>
								</div>
								<div className="">
									<div className="flex flex-col gap-2">
										<Label className="">Tags</Label>
										<Input
											required
											placeholder="Enter tag name"
											className="border-[1.5px] border-code-border outline-none  bg-transparent"
											value={tagName}
											onChange={(e) =>
												setTagName(e.target.value)
											}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													dispatch(
														addNewTag(tagName)
													);
													setTagName("");
												}
											}}
										/>
									</div>
									<div className="flex gap-2 flex-wrap mt-4">
										{tags.map((tag, i) => {
											return <Tag key={i} lable={tag} />;
										})}
									</div>
								</div>
								<Button
									disabled={title == "" ? true : false}
									className="bg-code-orange text-md text-black cursor-pointer"
									onClick={() => {
										if (formData) {
											dispatch(
												createCategory({ formData })
											);
										}
									}}
								>
									{loading ? (
										<Loader className="w-6 h-6 animate-spin" />
									) : (
										<span>Create</span>
									)}
								</Button>
							</div>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
			{categories.length == 0 ? (
				<div className="flex flex-col gap-5 items-center justify-center h-full">
					<h1 className="text-2xl font-fugaz">
						No category added yet
					</h1>
				</div>
			) : (
				<div className="flex w-full ">
					<CategoryCard
						title="Math"
						imgUrl=""
						tags={["combination", "puzzle"]}
					/>
				</div>
			)}
		</div>
	);
};

const Tag = ({ lable }: { lable: string }) => {
	const dispatch = useAppDispatch();

	return (
		<div className="bg-slate-800 rounded-full px-3 py-2 text-xs flex gap-3 items-cetner text-white justify-center font-medium cursor-pointer ">
			<span className="flex items-center text-code-orange">{lable}</span>
			<span
				className="bg-slate-700  w-4 h-4 rounded-full flex items-center justify-center"
				onClick={() => dispatch(removeTag(lable))}
			>
				<X className="w-3 h-3 rounded-full" />
			</span>
		</div>
	);
};
