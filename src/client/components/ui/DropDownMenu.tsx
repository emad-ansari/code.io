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
			<SelectTrigger className={cn("w-28 text-white border border-none", className)}>
				<SelectValue placeholder={placeholder} className="texxt-white" />
			</SelectTrigger>
			<SelectContent className="bg-darkGray text-white border border-BORDER">
				<SelectGroup className="">
					{items.map((item, index) => {
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
	);
};
