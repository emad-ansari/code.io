import { memo, useEffect, Suspense } from "react";
import { Outlet, useSearchParams, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "@/app/store";
import { fetchProblems, setPageSize } from "@/features/problemSlice";
import { FilterSection } from "@/components/common/FilterSection";
import { ProblemListSkeleton } from "@/components/skeletons/ProblemListSkeleton";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { problems_per_page } from "@/lib/types";
import { cn } from "@/lib/utils";

const ProblemsetPage = () => {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const { category } = useParams();

	useEffect(() => {
		dispatch(
			fetchProblems({
				categoryName: category ? category : "math",
				pageNumber: Number(searchParams.get("page")) || 1,
				difficulty: searchParams.get("difficulty") || "",
				status: searchParams.get("status") || "",
				searchKeywords: searchParams.get("search") || "",
			}),
		);
	}, []);

	const onProblemPerPageChange = (value: string) => {
		const problemPerPage = Number(value.split(" ")[0]);
		dispatch(setPageSize(problemPerPage));
	};

	return (
		<div className="relative min-h-screen bg-[#020617] text-white overflow-hidden">
			{/* 🌌 Background */}
			<div className="absolute inset-0">
				{/* Grid */}
				<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

				{/* Glow */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full" />
			</div>

			{/* Content */}
			<div className="relative z-10 px-6 md:px-16 py-34">
				<div className="max-w-5xl mx-auto w-full ">
					{/* 🚀 Hero Section */}
					<div className="mb-10">
						<h1 className="text-3xl md:text-4xl font-bold capitalize">
							{category || "Math"} Problems
						</h1>
						<p className="text-gray-400 mt-2">
							Practice curated problems and improve your
							problem-solving skills.
						</p>
					</div>

					{/* 📦 Main Container */}
					<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-6">
						{/* Filters */}
						<FilterSection />

						{/* Problem List */}
						<Suspense fallback={<ProblemListSkeleton />}>
							<Outlet />
						</Suspense>

						{/* Footer Controls */}
						<div className="flex flex-col md:flex-row items-center justify-between gap-4">
							{/* Select */}
							<Select onValueChange={onProblemPerPageChange}>
								<SelectTrigger
									className={cn(
										"w-36 h-10 bg-white/5 border border-white/10 text-white backdrop-blur-md",
									)}
								>
									<SelectValue placeholder="10 / page" />
								</SelectTrigger>

								<SelectContent className="bg-[#020617] text-white border border-white/10">
									<SelectGroup>
										{problems_per_page.map(
											(option, index) => (
												<SelectItem
													key={index}
													value={option}
												>
													{option}
												</SelectItem>
											),
										)}
									</SelectGroup>
								</SelectContent>
							</Select>

							{/* Pagination */}
							<CustomPagination />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const CustomPagination = memo(() => {
	const { totalPages } = useSelector((state: RootState) => state.problem);
	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get("page")) || 1;

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={page > 1 ? `?page=${page - 1}` : ""}
						className="bg-white/5 border border-white/10 text-white hover:bg-white/10"
					/>
				</PaginationItem>

				{Array.from({ length: totalPages }).map((_, index) => (
					<PaginationItem key={index}>
						<PaginationLink
							href={`?page=${index + 1}`}
							className={`border border-white/10 ${
								page === index + 1
									? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
									: "bg-white/5 text-gray-300 hover:bg-white/10"
							}`}
						>
							{index + 1}
						</PaginationLink>
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						href={page < totalPages ? `?page=${page + 1}` : ""}
						className="bg-white/5 border border-white/10 text-white hover:bg-white/10"
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
});

export default ProblemsetPage;
