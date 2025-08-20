import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

interface StreakCalendarProps {
	className?: string;
}

interface DayData {
	date: number;
	isCompleted: boolean;
	isStreak: boolean;
	isCurrentMonth: boolean;
}

export function StreakCalendar({ className = "" }: StreakCalendarProps) {
	const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // January 2022

	const monthNames = [
		"JAN",
		"FEB",
		"MAR",
		"APR",
		"MAY",
		"JUN",
		"JUL",
		"AUG",
		"SEP",
		"OCT",
		"NOV",
		"DEC",
	];

	const dayLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

	// Generate calendar data for a month
	const generateMonthData = (year: number, month: number): DayData[] => {
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert to Monday = 0

		const days: DayData[] = [];

		// Add empty days for the start of the month
		for (let i = 0; i < startingDayOfWeek; i++) {
			const prevMonthDate = new Date(
				year,
				month,
				-startingDayOfWeek + i + 1
			);
			days.push({
				date: prevMonthDate.getDate(),
				isCompleted: false,
				isStreak: false,
				isCurrentMonth: false,
			});
		}

		// Add days of the current month
		for (let day = 1; day <= daysInMonth; day++) {
			// Mock streak data - you can replace this with real data
			const isCompleted = Math.random() > 0.4; // Random completion
			const isStreak = day >= 9 && day <= 28 && month === 0; // Streak from 15th to 23rd in January

			days.push({
				date: day,
				isCompleted: isCompleted || isStreak,
				isStreak,
				isCurrentMonth: true,
			});
		}

		// Fill remaining days to complete the grid
		const remainingDays = 42 - days.length;
		for (let day = 1; day <= remainingDays; day++) {
			days.push({
				date: day,
				isCompleted: false,
				isStreak: false,
				isCurrentMonth: false,
			});
		}

		return days;
	};

	const navigateMonth = (direction: "prev" | "next") => {
		setCurrentDate((prev) => {
			const newDate = new Date(prev);
			if (direction === "prev") {
				newDate.setMonth(prev.getMonth() - 1);
			} else {
				newDate.setMonth(prev.getMonth() + 1);
			}
			return newDate;
		});
	};

	const renderMonth = (
		date: Date,
		index: number,
		totalMonths: number,
		showNavigation = true
	) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const monthData = generateMonthData(year, month);

		const isFirstMonth = index === 0;
		const isLastMonth = index === totalMonths - 1;

		return (
			<div key={`${year}-${month}`} className="flex-shrink-0 w-full">
				{/* Month Header - Fixed height for alignment */}
				<div className="flex items-center justify-between mb-3 h-10">
					{/* Left Arrow - only on first month */}
					{isFirstMonth && showNavigation ? (
						<Button
							size={"icon"}
							onClick={() => navigateMonth("prev")}
							className="p-2 text-white hover:text-yellow-400 transition-colors rounded-full bg-slate-700/50 cursor-pointer"
						>
							<ChevronLeft className="w-6 h-6" />
						</Button>
					) : (
						<div className="w-10"></div>
					)}

					<h2 className="text-white text-sm font-medium tracking-wider flex-1 text-center">
						{monthNames[month]} {year}
					</h2>

					{/* Right Arrow - only on last month */}
					{isLastMonth && showNavigation ? (
						<Button
                        	size={"icon"}
							onClick={() => navigateMonth("next")}
							className="p-2 text-white hover:text-yellow-400 transition-colors rounded-full bg-slate-700/50 cursor-pointe"
						>
							<ChevronRight className="w-6 h-6" />
						</Button>
					) : (
						<div className="w-10"></div>
					)}
				</div>

				{/* Separator Line - Fixed positioning */}
				{/* <div className="w-full h-px bg-slate-600 mb-6"></div> */}

				{/* Day Labels - Fixed height */}
				<div className="grid grid-cols-7 gap-2 mb-2 h-8">
					{dayLabels.map((day) => (
						<div
							key={day}
							className="text-center text-white text-[11px] font-medium flex items-center justify-center"
						>
							{day}
						</div>
					))}
				</div>

				{/* Calendar Grid */}
				<div className="grid grid-cols-7 ">
					{monthData.map((day, dayIndex) => {
						const prevDay = monthData[dayIndex - 1];
						const nextDay = monthData[dayIndex + 1];

						const isStreakStart =
							day.isStreak && !prevDay?.isStreak;
						const isStreakEnd = day.isStreak && !nextDay?.isStreak;
						const isStreakMiddle =
							day.isStreak &&
							prevDay?.isStreak &&
							nextDay?.isStreak;
						const isStreakSingle =
							day.isStreak &&
							!prevDay?.isStreak &&
							!nextDay?.isStreak;

						// Check if we're at row boundaries for proper streak background
						const isRowStart = dayIndex % 7 === 0;
						const isRowEnd = dayIndex % 7 === 6;

						return (
							<div
								key={dayIndex}
								className="relative h-11 flex items-center justify-center"
							>
								{/* Continuous Streak Background */}
								{day.isStreak && (
									<div
										className="absolute inset-y-[2px] bg-green-500/20 z-0"
										style={{
											left:
												isStreakStart || isRowStart
													? "9%"
													: "0%",
											right:
												isStreakEnd || isRowEnd
													? "9%"
													: "0%",
											transform:
												(isStreakStart || isRowStart) &&
												(isStreakEnd || isRowEnd)
													? "translateX(-50%)"
													: "none",
											borderRadius: isStreakSingle
												? "50%"
												: (isStreakStart ||
														isRowStart) &&
												  (isStreakEnd || isRowEnd)
												? "50%"
												: isStreakStart || isRowStart
												? "50% 0 0 50%"
												: isStreakEnd || isRowEnd
												? "0 50% 50% 0"
												: "0",
										}}
									/>
								)}

								{/* Day Circle */}
								<div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200">
									<div
										className={`w-full h-full rounded-full flex items-center justify-center ${
											day.isCurrentMonth
												? day.isStreak
													? "bg-green-400/80 text-white"
													: "bg-slate-700 text-white"
												: "bg-slate-600 text-slate-400"
										}`}
									>
										{day.isStreak ? (
											<Flame className="w-5 h-5 text-green-900" />
										) : (
											<span className="text-sm font-medium">
												{day.date}
											</span>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	// Generate multiple months based on screen size
	const getMonthsToShow = (monthCount: number) => {
		const months = [];
		const baseDate = new Date(currentDate);

		for (let i = 0; i < monthCount; i++) {
			const monthDate = new Date(
				baseDate.getFullYear(),
				baseDate.getMonth() + i,
				1
			);
			months.push(monthDate);
		}

		return months;
	};

	return (
		<div className={`bg-slate-800 rounded-2xl p-6 ${className}`}>
			{/* Mobile View - 1 Month */}
			<div className="block lg:hidden xl:hidden">
				<div className="block md:hidden">
					{renderMonth(currentDate, 0, 1, true)}
				</div>

				{/* Tablet View - 2 Months */}
				<div className="hidden md:block lg:hidden">
					<div className="grid grid-cols-2 gap-8">
						{getMonthsToShow(2).map((month, index) =>
							renderMonth(month, index, 2, true)
						)}
					</div>
				</div>
			</div>

			{/* Desktop View - 3 Months */}
			<div className="hidden lg:block">
				<div className="grid grid-cols-3 gap-8">
					{getMonthsToShow(3).map((month, index) =>
						renderMonth(month, index, 3, true)
					)}
				</div>
			</div>
		</div>
	);
}
