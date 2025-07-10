import { Button } from "@/client/components/ui/button";
import { Ellipsis, Search } from "lucide-react";
import { CustomPagination } from "@/client/pages/ProblemsetPage";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/client/components/ui/table";


const users = [
	{
		id: 1,
		username: "Emad",
		email: "emad@emad.com",
        role: "admin"
	},
	{
		id: 2,
        username: "Arsalan",
		email: "arsalan@arsalan.com",
        role: "admin"
	},
	{
		id: 3,
        username: "Rehan",
		email: "rehan@rehan.com",
        role: "user"
	},
	{
		id: 4,
        username: "Rehan",
		email: "rehan@rehan.com",
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
				<h1 className="text-3xl font-semibold m-0 text-code-orange">All Users</h1>
			</div>
			<div className="mt-8 flex items-center justify-between ">
				<div className="relative flex-1 text-white shadow-inner">
					<Search
						strokeWidth={1.25}
						className="absolute top-1/4 left-3 w-5 h-5"
					/>
					<input
						type="text"
						className="bg-code-bg rounded-full outline-none px-10 py-2.5 text-sm w-full placeholder-[#484848] focus:ring ring-slate-800 border border-code-border "
						placeholder="Search Users"
					/>
				</div>
			</div>
			<div className="mt-8">
				<Table className=" overflow-hidden rounded-xl  border border-code-border">
					<TableHeader className="bg-code-dark">
						<TableRow className="border-b border-code-border ">
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
								className="border-b border-code-border hover:bg-gray-750"
							>
								<TableCell className="text-left text-slate-300 ">
                                    {user.username}
								</TableCell>
								<TableCell className="text-left text-slate-300">
								    {user.email}
								</TableCell>
                                <TableCell className="text-left text-slate-300">
									<span className={` rounded-full px-2 py-1 ${user.role == 'admin' ? "bg-orange-500/20 text-orange-300" : "bg-blue-500/20 text-blue-300"} `}>{user.role}</span>
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
