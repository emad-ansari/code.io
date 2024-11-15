import { Button } from "@/client/components/ui/button";
import { BarChart, Plus, Star, Ellipsis, Search } from "lucide-react";
import { CustomPagination } from "@/client/pages/ProblemsetPage";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/client/components/ui/table";
import { DropDownMenu } from "@/client/components/ui/DropDownMenu";
import { DIFFICULTY } from "@/client/lib/types";
const users = [
	{
		id: 1,
		username: "Emad",
		email: "emad@emad.com",
        role: "admin"
	},
	{
		id: 2,
        username: "Emad",
		email: "emad@emad.com",
        role: "admin"
	},
	{
		id: 3,
        username: "Emad",
		email: "emad@emad.com",
        role: "user"
	},
];

const UserPage = () => {
	function filterProblems() {
		throw new Error("Function not implemented.");
	}

	return (
		<main>
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-semibold m-0">All Users</h1>
			</div>
			<div className="mt-8 flex items-center justify-between ">
				<div className="relative flex-1 text-white shadow-inner">
					<Search
						strokeWidth={1.25}
						className="absolute top-1/4 left-3 w-5 h-5"
					/>
					<input
						type="text"
						className="bg-code-bg rounded-md outline-none px-10 py-2.5 text-sm w-full placeholder-[#484848] focus:ring ring-slate-800 border border-[#334155] "
						placeholder="Search Users"
					/>
				</div>
				<div className="flex flex-1 items-center justify-end">
					{/* <DropDownMenu
						className="bg-code-bg w-32 h-10 text-md  border border-code-border"
						placeholder="Difficulty"
						items={DIFFICULTY}
						onValueChange={filterProblems}
					/> */}
				</div>
			</div>
			<div className="mt-8">
				<Table className=" overflow-hidden rounded-lg bg-code-bg-secondary border border-code-border w-[900px]">
					<TableHeader className="bg-gray-800">
						<TableRow className="border-b border-code-border  hover:bg-gray-750 ">
							<TableHead className="text-gray-300">
								Username 
							</TableHead>
							<TableHead className="text-gray-300">
								Email
							</TableHead>
                            <TableHead className="text-gray-300">
								Role
							</TableHead>
							<TableHead className="text-gray-300 text-center">
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="border border-code-border">
						{users.map((user) => (
							<TableRow
								key={user.id}
								className="border-b border-gray-700 hover:bg-gray-750"
							>
								<TableCell className="text-left text-slate-300 ">
                                    {user.username}
								</TableCell>
								<TableCell className="text-left text-slate-300">
								    {user.email}
								</TableCell>
                                <TableCell className="text-left text-slate-300">
								    {user.role}
								</TableCell>
								<TableCell className="text-center">
									<Button
										size="icon"
										className="rounded-full"
									>
										<Ellipsis className="h-4 w-4 text-blue-400" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<div className="flex flex-row items-center justify-start mt-5">
				<div>
					<CustomPagination />
				</div>
			</div>
		</main>
	);
};

export default UserPage;
