import React from "react";
import { cn } from "@/client/lib/utils";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/client/components/ui/select";


interface DropDownMenuProps {
    items:  string[];
    placeholder: string;
    className:  string;
    onValueChange: (value: string) => void
}

export const DropDownMenu: React.FC<DropDownMenuProps> = ({ items, placeholder, className, onValueChange}) => {
	return (
		<Select onValueChange={(value) => onValueChange(value)}>
			<SelectTrigger className={cn("text-white", className)}>
				<SelectValue placeholder={placeholder} className="text-white" />
			</SelectTrigger>
			<SelectContent className={cn("bg-code-bg text-white border border-code-border")}>
				<SelectGroup >
					{items.map((item, index) => {
						return (
							<SelectItem
								value={item}
								key={index}
								className= {cn("cursor-pointer")}
							>
								{item}
							</SelectItem>
						);
					})}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
