import React from "react";
import { cn } from "@/client/lib/utils";
import { AppliedFilter } from "../common/FilterSection";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/client/components/ui/select";

interface DropDownMenuProps {
	filterType: "difficulty" | "status";
	filterOptions: string[];
	placeholder: string;
	className: string;
	onSelect: ({filterType, filterOption}: AppliedFilter) => void;
}

export const DropDownMenu: React.FC<DropDownMenuProps> = ({
	filterType,
	filterOptions,
	placeholder,
	className,
	onSelect,
}) => {

	return (
		<Select onValueChange={(value) => onSelect({filterType, filterOption: value})}>
			<SelectTrigger className={cn("text-white", className)}>
				<SelectValue placeholder={placeholder} className="text-white" />
			</SelectTrigger>
			<SelectContent
				className={cn(
					"bg-code-bg text-white border-[1.5px] border-slate-800"
				)}
			>
				<SelectGroup>
					{filterOptions && filterOptions.map((option, index) => {
						return (
							<SelectItem
								value={option}
								key={index}
								className={cn("cursor-pointer focus:bg-code-hover")}
							>
								{option}
							</SelectItem>
						);
					})}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
