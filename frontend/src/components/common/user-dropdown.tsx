"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { User, Settings, LogOut } from "lucide-react";
import avtar from "@/assets/avatar.png";
import { UserDetail } from "@/lib/types";
import { useNavigate } from "react-router-dom";

export function UserDropdown({ username, email, image }: UserDetail) {
	const navigate = useNavigate();

	return (
		<DropdownMenu>
			{/* Trigger (Avatar/Icon) */}
			<DropdownMenuTrigger asChild>
				<button className="flex items-center gap-2 rounded-full p-1 bg-slate-400  hover:bg-slate-300 transition cursor-pointer">
					<img
						src={image || avtar}
						alt="profile"
						className="w-8 h-8 rounded-full"
					/>
				</button>
			</DropdownMenuTrigger>

			{/* Dropdown Content */}
			<DropdownMenuContent
				align="end"
				className="w-64 rounded-2xl bg-[#0B1220]/80 backdrop-blur-xl border border-white/10"
			>
				{/* Profile Section */}
				<div className="flex items-center gap-3 p-3 border-b border-white/10">
					<img
						src={image || avtar}
						alt="profile"
						className="w-10 h-10 rounded-full bg-slate-400"
					/>
					<div>
						<p className="text-sm font-medium text-white">
							{username || "User Name"}
						</p>
						<p className="text-xs text-gray-400">
							{email || "user@email.com"}
						</p>
					</div>
				</div>

				{/* Menu Items */}
				<DropdownMenuItem
					className="flex items-center gap-3 cursor-pointer"
					onClick={() => navigate(`/me/${username}`)}
				>
					<User className="w-4 h-4" />
					View Profile
				</DropdownMenuItem>

				<DropdownMenuItem
					className="flex items-center gap-3 cursor-pointer"
					onClick={() => navigate("/settings")}
				>
					<Settings className="w-4 h-4" />
					Settings
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem className="flex items-center gap-3 text-red-400 focus:text-red-300 cursor-pointer">
					<LogOut className="w-4 h-4" />
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
