import { TestCaseExample } from "./TestCaseExample";
import { testcase } from "../../utils/testcase";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate, Outlet } from "react-router-dom";

export const ProblemDescription = () => {
	const navigate = useNavigate();

	return (
		<section className="rounded-lg bg-darkGray  text-white border border-gray-500 ">
			<div className="flex items-center bg-[#1f2937] px-2 py-1 rounded-tl-lg rounded-tr-lg gap-5 border border-gray-500">
				<Button
					classname="bg-gray-700 text-white rounded-md"
					onClick={() => navigate("./description")}
				>
					<span>Description</span>
				</Button>

				<Button
					classname="bg-gray-700 text-white rounded-md"
					onClick={() => navigate("submissions")}
				>
					<span>Submissons</span>
				</Button>
			</div>
			<Outlet />
		</section>
	);
};

export function ProblemStatement() {
	const [description, setDescription] = useState<string>("");

	// fetch the test cases here inside useEffect
	useEffect(() => {}, []);

	return (
		<div className="flex flex-col gap-4 px-5 pb-3 overflow-y-scroll scroll-smooth h-[93%]">
			<div className="flex flex-col gap-5 pt-5 ">
				<div className="flex flex-row items-center justify-between">
					<span className="text-3xl font-semibold">1.Two Sum</span>
					<div className="flex flex-row gap-12">
						<span className="font-normal text-sm text-[#4ac3ab] bg-gray-800 px-3 py-1 rounded-full">Easy</span>
						<div className="flex flex-row gap-1  items-center  bg-gray-800 rounded-full px-3 py-1">
							<span className="text-sm">Solved</span>
							<IoMdCheckmarkCircleOutline className = 'text-[#4ac3ab]' /> 
						</div>
					</div>
				</div>
				<span className="text-justify">
					Given an array of integers nums and an integer target,
					return indices of the two numbers such that they add up to
					target. You may assume that each input would have exactly
					one solution, and you may not use the same element twice.
					You can return the answer in any order.
				</span>
			</div>
			<div className="flex flex-col gap-8 ">
				{testcase.map((testcase, index) => {
					return (
						<TestCaseExample
							key={testcase.id}
							testCaseNumber={index}
							input={testcase.input}
							output={testcase.output}
						/>
					);
				})}
			</div>
		</div>
	);
}
