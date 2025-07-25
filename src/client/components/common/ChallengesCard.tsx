import { useNavigate } from "react-router-dom";
import { Progress } from "@/client/components/ui/progress";
import { ChevronRight } from "lucide-react";

import { ChallengesCardSchema } from "@/client/lib/types";

interface TagProps {
	name: string;
}

export const ChallengesCard: React.FC<ChallengesCardSchema> = ({
	imgUrl,
	title,
	type,
	tags,
	solvedChallenges,
	totalChallenges,
}) => {
	const navigate = useNavigate();

	return (
		<div
			className="flex h-auto gap-4 border-[1.5px] border-code-border rounded-2xl py-3 pl-3 pr-5 shadow-lg cursor-pointer items-stretch"
			onClick={() => navigate(`/problemset/${type}`)}
		>
			<div className=" flex w-34 h-34 self-center shrink-0">
				<img
					src={imgUrl}
					alt="Challenges-Image"
					className="h-full w-full object-contain"
				/>
			</div>

			<div className="flex flex-col gap-5">
				<div className="flex justify-between ">
					<h1 className="text-2xl font-bold ">{title}</h1>
				</div>

				<div className="flex flex-wrap items-center gap-3.5 ">
					{tags.map((tag, i) => {
						return <Tag key={i} name={tag} />;
					})}
				</div>
			</div>

			<div className=" flex flex-col justify-between pt-3 pb-2 ">
				<div className="flex flex-col items-end w-40 gap-2 justify-end">
					<Progress
						value={(solvedChallenges / totalChallenges) * 100}
						className="w-[85%] [&>div]:bg-code-orange bg-code-dark"
					/>
					<span className="text-sm">
						{solvedChallenges} / {totalChallenges} challenges
					</span>
				</div>
				<div className="flex justify-end items-center ">
					<span className="text-sm">view All Problems</span>
					<ChevronRight className="w-5 h-5 " />
				</div>
			</div>
		</div>
	);
};

const Tag: React.FC<TagProps> = ({ name }) => {
	return (
		<span className="flex items-center justify-center text-sm bg-code-dark rounded-full px-3.5 py-1.5">
			{name}
		</span>
	);
};
