import { Button } from "@/client/components/ui/button";
import { Input } from "@/client/components/ui/input";
import { Plus, X } from "lucide-react";
import { useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/client/components/ui/dialog";
import { Label } from "@/client/components/ui/label";

interface ProblemCategory {
	categoryName: string;
	imageUrl: string;
	tags: string[];
}

export const ProblemCategoryPage = () => {
	const [tags, setTags] = useState<string[]>([]);
	const [tageName, setTagName] = useState<string>("");

	const [categoryCard, setCategoryCard] = useState<ProblemCategory[]>([]);

	return (
		<div className="h-full">
			{categoryCard.length == 0 ? (
				<div className="flex flex-col gap-5 items-center justify-center h-full">
					<h1 className="text-2xl font-fugaz">
						No category added yet
					</h1>
					<Dialog>
						<DialogTrigger>
							<Button className="flex gap-2 bg-code-dark items-center cursor-pointer">
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
										<Label className="">
											Category Name
										</Label>
										<Input
											required
											placeholder="Math"
											className="border-[1.5px] border-code-border outline-none  bg-transparent"
										/>
									</div>
									<div className="flex flex-col gap-2">
										<Label className="">Image Url</Label>
										<Input
											required
											placeholder="Image Link"
											className="border-[1.5px] border-code-border outline-none  bg-transparent"
										/>
									</div>
									<div className="">
										<div className="flex flex-col gap-2">
											<Label className="">Tags</Label>
											<Input
												required
												placeholder="Enter tag name"
												className="border-[1.5px] border-code-border outline-none  bg-transparent"
												value={tageName}
												onChange={(e) =>
													setTagName(e.target.value)
												}
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														setTags((prev) => [
															...prev,
															tageName,
														]);
														setTagName("");
													}
												}}
											/>
										</div>
										<div className="flex gap-2 flex-wrap mt-4">
											{tags.map((tag, i) => {
												return (
													<Tag
														key={i}
														tagName={tag}
													/>
												);
											})}
										</div>
									</div>
									<Button className="bg-code-orange text-black text-md ">
										Create
									</Button>
								</div>
							</DialogHeader>
						</DialogContent>
					</Dialog>
				</div>
			) : (
				<div className="flex ">
                    
                </div>
			)}
		</div>
	);
};

const Tag = ({ tagName }: { tagName: string }) => {
	return (
		<div className="bg-slate-800 rounded-full px-3 py-2 text-xs flex gap-3 items-cetner text-white justify-center font-medium cursor-pointer ">
			<span className="flex items-center text-code-orange">
				{tagName}
			</span>
			<span className="bg-slate-700  w-4 h-4 rounded-full flex items-center justify-center">
				<X className="w-3 h-3 rounded-full" />
			</span>
		</div>
	);
};

