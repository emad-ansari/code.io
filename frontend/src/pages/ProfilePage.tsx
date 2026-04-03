import  { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/app/store";
import { getUserProfile } from "@/features/userSlice";
import { useNavigate } from "react-router-dom";
import { Loader, Flame } from "lucide-react";
import  StreakCalendar  from "@/components/ui/streak-calender";
import avtar from '@/assets/avatar.png'

export const ProfilePage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { isLoggedIn } = useSelector((state: RootState) => state.auth);
	const { profile, loading } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (!isLoggedIn) navigate("/");
	}, [isLoggedIn]);

	useEffect(() => {
		dispatch(getUserProfile());
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen bg-[#020617] flex items-center justify-center">
				<Loader className="w-6 h-6 text-gray-400 animate-spin" />
			</div>
		);
	}

	return (
		<div className="relative min-h-screen bg-[#020617] text-white overflow-hidden">
			{/* 🌌 Background */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[120px]" />
			</div>

			<div className="relative z-10 max-w-5xl mx-auto py-28 flex flex-col gap-8">
				{/* 👤 Profile Header */}
				<div className="flex items-center gap-4">
					<img src = {avtar} className="w-14 h-14 rounded-full bg-slate-400 flex items-center justify-center font-bold text-lg" />
						
					

					<div>
						<h1 className="text-2xl font-semibold">
							{profile?.username}
						</h1>
						<p className="text-gray-400 text-sm">
							{profile?.email}
						</p>
					</div>
				</div>

				{/* 📊 Stats + Progress */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Total Solved */}
					<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
						<p className="text-gray-400 text-sm">Total Solved</p>
						<h2 className="text-2xl font-bold mt-1">
							{profile?.overAllProgress?.solved || 0}
						</h2>
					</div>

					{/* Current Streak */}
					<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex items-center gap-3">
						<Flame className="text-orange-400" />
						<div>
							<p className="text-gray-400 text-sm">
								Current Streak
							</p>
							<h2 className="text-xl font-bold">
								{profile?.currentStreak || 0} days
							</h2>
						</div>
					</div>

					{/* Longest Streak */}
					<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
						<p className="text-gray-400 text-sm">Longest Streak</p>
						<h2 className="text-xl font-bold mt-1">
							{profile?.longestStreak || 0} days
						</h2>
					</div>
				</div>

				{/* 📈 Difficulty Progress */}
				<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
					<h2 className="text-lg font-semibold">Progress</h2>

					<ProgressBar
						label="Easy"
						value={profile?.easyProgress?.solved || 0}
						total={profile?.easyProgress?.total || 0}
						color="bg-green-500"
					/>
					<ProgressBar
						label="Medium"
						value={profile?.mediumProgress?.solved || 0}
						total={profile?.mediumProgress?.total || 0}
						color="bg-yellow-500"
					/>
					<ProgressBar
						label="Hard"
						value={profile?.hardProgress?.solved || 0}
						total={profile?.hardProgress?.total || 0}
						color="bg-red-500"
					/>
				</div>

				{/* 🔥 Streak Calendar (Main Focus) */}
				<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
					<h2 className="text-lg font-semibold mb-4">Activity</h2>
					<StreakCalendar />
				</div>
			</div>
		</div>
	);
};

interface ProgressBarProps {
	label: string;
	value: number;
	total: number;
	color: string; 
}

const ProgressBar = ({ label, value, total, color }: ProgressBarProps) => {
	const percent = total ? (value / total) * 100 : 0;

	return (
		<div className="flex items-center gap-4">
			<span className="w-16 text-sm text-gray-300">{label}</span>

			<div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
				<div
					className={`${color} h-full`}
					style={{ width: `${percent}%` }}
				/>
			</div>

			<span className="text-sm text-gray-400 w-16 text-right">
				{value}/{total}
			</span>
		</div>
	);
};
