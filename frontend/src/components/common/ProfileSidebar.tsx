import type React from "react";

import {
	LayoutDashboard,
	Star,
	BarChart3,
	Settings,
	ArrowUpRight,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

interface SidebarProps {
	className?: string;
}

interface MenuItem {
	icon: React.ElementType;
	label: string;
	href?: string;
}

export function ProfileSidebar({ className = "" }: SidebarProps) {
	const {profile } = useSelector((state: RootState) => state.user);

	const menuItems: MenuItem[] = [
		{ icon: LayoutDashboard, label: "Dashboard" },
		{ icon: Star, label: "Achievements" },
		{ icon: BarChart3, label: "Scoreboard" },
		{ icon: Settings, label: "Settings" },
	];

	const currentXP = 580;
	const maxXP = 800;
	const level = 7;
	const coins = 72;
	const progressPercentage = (currentXP / maxXP) * 100;

	return (
		<div className={` bg-code-dark flex flex-col w-full justify-center${className}`}>
			<div className="p-6 border-b border-slate-700  ">
				{/* Profile Picture */}
				<div className="flex justify-center mb-4">
					<div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-300">
						<img
							src="/placeholder.svg?height=64&width=64"
							alt="Andrei Spitzer"
							width={64}
							height={64}
							className="w-full h-full object-cover"
						/>
					</div>
				</div>

				{/* User Info */}
				<div className="text-center mb-4">
					<h2 className="text-white font-semibold text-lg">
						{profile?.username}
					</h2>
				</div>

				{/* XP Progress */}
				{/* <div className="mb-4">
					<div className="flex justify-between items-center mb-2">
						<span className="text-slate-300 text-sm">
							{currentXP}/{maxXP} XP
						</span>
						<span className="text-slate-300 text-sm">
							Level {level}
						</span>
					</div>
					<div className="w-full bg-slate-700 rounded-full h-2">
						<div
							className="bg-green-500 h-2 rounded-full transition-all duration-300"
							style={{ width: `${progressPercentage}%` }}
						/>
					</div>
				</div> */}

				{/* Coins */}
				{/* <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
					<div className="flex items-center gap-2">
						<div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
							<div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
						</div>
						<span className="text-white text-sm font-medium">
							{coins} coins
						</span>
					</div>
					<button className="text-slate-300 hover:text-white text-sm flex items-center gap-1 transition-colors">
						Transfer
						<ArrowUpRight className="w-3 h-3" />
					</button>
				</div> */}
			</div>

			{/* Navigation Menu - Scrollable */}
			<nav className="flex-1 overflow-hidden">
				<div className="h-full overflow-y-auto custom-scrollbar p-4">
					<ul className="space-y-1">
						{menuItems.map((item, index) => {
							const Icon = item.icon;
							return (
								<li key={index}>
									<button className="w-full flex items-center gap-3 px-3 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 group">
										<Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
										<span className="text-sm font-medium">
											{item.label}
										</span>
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			</nav>
		</div>
	);
}
