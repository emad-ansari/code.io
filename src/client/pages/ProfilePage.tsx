import { useState } from "react";
import { CircularProgress } from "@/client/components/ui/circular-progress-";
import { Progress } from "@/client/components/ui/progress";
import { Calendar, Flame } from "lucide-react";
import { ProfileSidebar } from "@/client/components/common/ProfileSidebar";
import { StreakCalendar } from "@/client/components/ui/streak-calender";

interface LinearProgressProps {
	label: string;
	className: string;
	progress: number;
}
export const ProfilePage = () => {
	const [progress, setProgress] = useState<number>(20);

	return (
		<main className="pt-19 px-4 bg-code-bg text-white min-h-screen flex flex-col gap-4 lg:flex-row pb-4">
            
			<aside
				className={`bg-code-dark flex lg:w-80  rounded-2xl px-2 py-2  lg:mb-0`}
			>
				<ProfileSidebar />
			</aside>

			<section className="flex flex-col gap-4 w-full justify-between">
				<div className="flex flex-col lg:flex-row gap-4 ">
					<div className="flex-1 flex-col gap-1 rounded-2xl px-5 py-4 bg-code-dark">
						<h1 className="font-medium text-xl">
							Overall Progress
						</h1>
						<div className="flex items-center justify-center ">
							<CircularProgress
								value={progress}
								size={170}
								strokeWidth={10}
								showLabel
								labelClassName="text-xl font-bold"
								renderLabel={(progress) => `${progress} %`}
								className="stroke-[#264545]"
								progressClassName="stroke-[#1cbaba]"
							/>
						</div>
						<div className="flex flex-col gap-2 ">
							<LinearProgress
								label="Easy"
								progress={50}
								className="[&>div]:bg-green-500 bg"
							/>
							<LinearProgress
								label="Medium"
								progress={30}
								className=" [&>div]:bg-yellow-500"
							/>
							<LinearProgress
								label="Hard"
								progress={20}
								className=" [&>div]:bg-red-500"
							/>
						</div>
					</div>
					<div className="flex-1 rounded-2xl px-5 py-4 bg-code-dark">
						<CalendarStreak />
					</div>
				</div>
				<div className=" flex-1 rounded-2xl px-2 py-1 bg-code-dark h-90">
					<StreakCalendar />
				</div>
			</section>
		</main>
	);
};

const LinearProgress: React.FC<LinearProgressProps> = ({
	label,
	className,
	progress,
}) => {
	return (
		<div className="flex gap-4 items-center justify-between ">
			<span className="w-16 text-sm font-medium ">{label}</span>
			<div className="flex shrink-0 w-[70%] ">
				<Progress
					value={progress}
					className={`w-full bg-gray-500/20 ${className}`}
				/>
			</div>

			<span className="flex text-center font-semibold">{progress} %</span>
		</div>
	);
};

export const CalendarStreak = () => {
	const currentStreak = 7;
	const longestStreak = 15;

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold text-white">
				Calendar Streak
			</h2>

			<div className="grid grid-cols-2 gap-4">
				<div className="bg-slate-700/50  rounded-xl p-4 text-center">
					<div className="flex items-center justify-center mb-2">
						<Flame className="w-6 h-6 text-orange-500" />
					</div>
					<div className="text-2xl font-bold text-white">
						{currentStreak}
					</div>
					<div className="text-sm text-slate-300">Current Streak</div>
				</div>

				<div className=" bg-slate-700/50  rounded-xl p-4 text-center">
					<div className="flex items-center justify-center mb-2">
						<Calendar className="w-6 h-6 text-blue-400" />
					</div>
					<div className="text-2xl font-bold text-white">
						{longestStreak}
					</div>
					<div className="text-sm text-slate-300">Longest Streak</div>
				</div>
			</div>
		</div>
	);
};
