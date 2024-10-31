import { useState } from "react";
import { CircleCheckBig, Contrast, Check, ListTodo } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { fetchProblem } from "@/client/features/problemSlice";
import { useSearchParams } from "react-router-dom";

export const StatusDropDownMenu = () => {
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentStatusOption, setCurrentStatusOption] = useState<string>("");

	const { isStatusMenuOpen } = useSelector(
		(state: RootState) => state.dropdown
	);
	
	const handleStatusFilter = (currentFilterOption: string) => {
		setCurrentStatusOption(currentFilterOption);

		if (searchParams.get("status") === currentFilterOption) {
			searchParams.delete("status"); // remove it from url
		} else {
			searchParams.set("status", currentFilterOption); // add it
		}
		setSearchParams(searchParams);

		dispatch(
			fetchProblem({
				pageNumber: Number(searchParams.get("page")) || 1,
				difficulty: searchParams.get("difficulty") || "",
				status: searchParams.get("status") || "",
				searchKeywords: searchParams.get("search") || "",
			})
		);
	};

	return (
		<div
			className={` bg-darkGray flex flex-col absolute bottom-0 left-0 right-[-40px] top-[110%] h-[125px] items-center rounded-lg shadow-lg py-2 z-10 ${
				isStatusMenuOpen ? "" : " hidden"
			} ease-in-out duration-300`}
		>
			<div
				className="text-white font-normal hover:bg-hover flex gap-3 items-center px-1 py-2 w-[90%] rounded-md text-md z-0 justify-between"
				onClick={() => handleStatusFilter("Todo")}
			>
				<div className="flex flex-row gap-2 items-center">
					<ListTodo size={16} className="text-white" />
					<span className="text-sm z-0">Todo</span>
				</div>
				{currentStatusOption === "Todo" ? <Check size={16} /> : null}
			</div>
			<div
				className="text-white font-normal hover:bg-hover flex gap-1 items-center px-1 py-2 w-[90%] rounded-md text-md z-0 justify-between"
				onClick={() => handleStatusFilter("Solved")}
			>
				<div className="flex flex-row gap-2 items-center">
					<CircleCheckBig size={16} className="text-[#2baa66] " />
					<span className="text-sm">Solved</span>
				</div>
				{currentStatusOption === "Solved" ? <Check size={16} /> : null}
			</div>
			<div
				className="text-white font-normal hover:bg-hover flex gap-2  items-center px-1 py-2 w-[90%] rounded-md text-md justify-between"
				onClick={() => handleStatusFilter("Attempted")}
			>
				<div className="flex flex-row gap-2 items-center">
					<Contrast size={16} className=" text-[#FAFF16]" />
					<span className="text-sm">Attempted</span>
				</div>
				{currentStatusOption === "Attempted" ? (
					<Check size={16} />
				) : null}
			</div>
		</div>
	);
};
