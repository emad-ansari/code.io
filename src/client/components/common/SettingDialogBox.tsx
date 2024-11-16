import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

import { Label } from "../ui/label";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/client/app/store";
import { setFontSize, setTheme } from "../../features/editorSettingSlice";
import { Settings } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { EDITOR_THEMES, FONT_SIZES } from "../../lib/types";

export default function SettingDialogBox() {
	const dispatch = useAppDispatch();
	const { fontSize } = useSelector((state: RootState) => state.setting);
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="icon" className="rounded-full hover:bg-gray-800">
					<Settings size={16} className="text-white" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] bg-darkGray text-white border border-codeio_border">
				<DialogHeader>
					<DialogTitle>Editor Playground Setting</DialogTitle>
					<DialogDescription>
						You can change the theme and font size.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-3 py-4">
					<div className="flex flex-row  items-center justify-between">
						<Label htmlFor="font-size" className="flex">
							Font Size:
						</Label>
						<Select
							onValueChange={(value) => {
								const newFontSize = Number(
									value.substring(0, 2)
								);
								dispatch(setFontSize(newFontSize));
							}}
						>
							<SelectTrigger className="w-[80%] text-white border border-none bg-gray-800">
								<SelectValue
									placeholder={`${fontSize}px`}
									className="text-white"
								/>
							</SelectTrigger>
							<SelectContent className="bg-darkGray text-white border border-codeio_border">
								<SelectGroup className="">
									{FONT_SIZES.map((item, index) => {
										return (
											<SelectItem
												value={item}
												key={index}
												className="cursor-pointer"
											>
												{item}
											</SelectItem>
										);
									})}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className="flex flex-row gap-5 items-center justify-between">
						<Label htmlFor="theme" className="flex flex-1">
							Theme:
						</Label>
						<Select
							onValueChange={(value) => dispatch(setTheme(value))}
						>
							<SelectTrigger className="w-[80%] text-white border border-none bg-gray-800">
								<SelectValue
									placeholder="vs-dark"
									className="texxt-white"
								/>
							</SelectTrigger>
							<SelectContent className="bg-darkGray text-white border border-codeio_border">
								<SelectGroup className="">
									{EDITOR_THEMES.map((item, index) => {
										return (
											<SelectItem
												value={item}
												key={index}
												className="cursor-pointer"
											>
												{item}
											</SelectItem>
										);
									})}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
