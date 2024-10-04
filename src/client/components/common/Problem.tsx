import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { BsCalendarCheckFill } from "react-icons/bs";
import { BiAdjust } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { startTransition } from "react";

interface ProblemProps {
	id: string;
	title: string;
	status: string;
	difficulty: string;
	problemNo: number;
}

export const Problem = ({
	id,
	title,
	status,
	difficulty,
	problemNo,
}: ProblemProps) => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-row bg-darkGray h-14 rounded-md cursor-pointer">
			<div
				className={`flex w-36 items-center px-3  ${
					status === "visited" ? "text-[#f5f78e]" : "text-[#0FA958]"
				} text-2xl`}
			>
				{status === "completed" ? (
					<IoCheckmarkCircleOutline />
				) : status === "visited" ? (
					<BiAdjust />
				) : status === "daily" ? (
					<BsCalendarCheckFill />
				) : (
					""
				)}
			</div>
			<div
				className="flex flex-1 justify-start items-center text-white gap-2"
				onClick={() => {
					startTransition(() => {
						navigate(`../../problem/${title}/description`);
					});
				}}
			>
				<span>{problemNo}.</span>
				<span>{title}</span>
			</div>
			<div className=" w-[110px] text-center pt-4">
				<span
					className={`flex items-center font-normal ${
						difficulty === "Hard"
							? "text-RED"
							: difficulty === "Medium"
							? "text-YELLOW"
							: "text-GREEN"
					} `}
				>
					{difficulty === "Hard"
						? "Hard"
						: difficulty === "Medium"
						? "Medium"
						: "Easy"}
				</span>
			</div>
		</div>
	);
};
