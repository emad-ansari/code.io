import { Button } from "@/components/ui/button";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export const DashboardHeader = () => {
	return (
		<header className=" p-4 flex items-center justify-end">
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
