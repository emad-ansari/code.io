import { Tag } from "@/components/common/ChallengesCard";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

interface CategoryCardProps {
    title: string;
    imgUrl: string;
    tags: string[];
}

export const CategoryCard: React.FC<CategoryCardProps> = ({title, imgUrl, tags}) => {

	return (
		<div
			className="max-w-3xl  flex h-auto gap-4 border-[1.5px] border-code-border rounded-2xl py-3 pl-3 pr-5 shadow-lg cursor-pointer items-stretch"
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

			<div className=" flex flex-row justify-between gap-2 ">
				<Button size = "icon" className="bg-red-500/15 rounded-full cursor-pointer">
                    <Trash className="w-4 h-4 text-red-500"></Trash>
                </Button>

                <Button size = "icon" className="bg-slate-700/20 rounded-full cursor-pointer">
                    <Edit className="w-4 h-4 "></Edit>
                </Button>
			</div>
		</div>
	);
};
