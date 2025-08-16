import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/client/app/store";
import { Maximize, Minimize } from "lucide-react";
import { LANGUAGES } from "@/client/lib/types";
import { cn } from "@/client/lib/utils";

import SettingDialogBox from "@/client/components/common/SettingDialogBox";
import { Button } from "@/client/components/ui/button";

import {
	setLanguage,
	toggleFullScreen,
} from "@/client/features/codeEditorSlice";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export function EditorTopBar() {
	const dispatch = useAppDispatch();
	const { isFullScreen} = useSelector(
		(state: RootState) => state.editor
	);

	const onLanguageChange = (seletedLanguage: string) => {
		localStorage.setItem("selectedLanguage", seletedLanguage);
		dispatch(setLanguage(seletedLanguage));
	};

	return (
		<div className="flex items-center px-2 py-1 bg-code-bg rounded-tl-lg rounded-tr-lg justify-between  gap-5 border border-b-code-border border-t-transparent border-l-transparent border-r-transparent">
			<div className="">
				<Select onValueChange={onLanguageChange}>
					<SelectTrigger
						className={cn(
							"text-white bg-code-dark  w-28 h-9 border-none"
						)}
					>
						<SelectValue
							placeholder={"java"}
							className="text-white"
						/>
					</SelectTrigger>
					<SelectContent
						className={cn(
							"bg-code-bg text-white border-[1.5px] border-code-border"
						)}
					>
						<SelectGroup>
							{LANGUAGES.map((language, index) => {
								return (
									<SelectItem
										value={language}
										key={index}
										className={cn(
											"cursor-pointer focus:bg-code-dark"
										)}
									>
										{language}
									</SelectItem>
								);
							})}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<div className="flex flex-row gap-2 items-center ">
				<SettingDialogBox />
				<Button
					size={"icon"}
					className={"hover:bg-gray-800  rounded-full"}
					onClick={() => dispatch(toggleFullScreen(!isFullScreen))}
				>
					{isFullScreen ? (
						<Minimize size={16} className="text-white" />
					) : (
						<Maximize size={16} className="text-white" />
					)}
				</Button>
			</div>
		</div>
	);
}
