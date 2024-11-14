import { Search } from "lucide-react";

import { Button } from "@/client/components/ui/button";
import { Input } from "@/client/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/client/components/ui/dropdown-menu";


export const DashboardHeader = () => {
	return (
		<header className="bg-code-bg  p-4 flex items-center justify-between">
			<div className="flex items-center flex-1">
				<div className="relative w-96">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
					<Input
						type="search"
						placeholder="Search (Ctrl+/)"
						className="bg-gray-800 border-gray-700 text-gray-100 pl-10 w-full"
					/>
				</div>
			</div>
			<div className="flex items-center">
				<DropdownMenu >
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="rounded-full bg-white text-black">
							<span >ME</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="bg-gray-900 text-white">
						<DropdownMenuItem className="bg-gray-900">Profile</DropdownMenuItem>
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};
