import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Maximize, Minimize } from "lucide-react";

import { RootState, useAppDispatch } from "@/client/app/store";
import SettingDialogBox from "@/client/components/common/SettingDialogBox";
import { Button } from "@/client/components/ui/button";
import { DropDownMenu } from "@/client/components/ui/DropDownMenu";

import {
	fetchDefaultCode,
	setLanguage,
	toggleFullScreen,
	setCode,
} from "@/client/features/codeEditorSlice";

import { LNAGUAGE_MAPPING, LANGUAGES } from "@/client/lib/types";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { cn } from "@/client/lib/utils";

export function EditorTopBar() {
	const dispatch = useAppDispatch();
	const { title } = useParams();
	const { isFullScreen, language } = useSelector(
		(state: RootState) => state.editor
	);

	const onLanguageChange = (item: string) => {
		localStorage.setItem("selectedLanguage", item);
		if (title) {
			const formattedTitle = title.replace(/-/g, " ");
			const savedCode = localStorage.getItem(`${title}_${item}`);

			if (savedCode) {
				dispatch(setCode(savedCode));
			} else {
				dispatch(
					fetchDefaultCode({
						problemTitle: formattedTitle,
						languageId: LNAGUAGE_MAPPING[`${item}`].languageId,
					})
				);
			}
		}
		dispatch(setLanguage(item));
	};

	return (
		<div className="flex items-center px-2 py-1 bg-code-bg rounded-tl-lg rounded-tr-lg justify-between  gap-5 border border-b-code-border border-t-transparent border-l-transparent border-r-transparent">
			<div className="">
				<Select onValueChange={onLanguageChange}>
					<SelectTrigger
						className={cn("text-white bg-code-dark  w-28 h-9 border-none")}
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
				<SettingDialogBox /> {/* editor setting */}
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
