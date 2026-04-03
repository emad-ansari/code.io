import { RootState, useAppDispatch } from "@/app/store";
import { fetchCategories } from "@/features/problemCategorySlice";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProblemCategory() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { categories, loading } = useSelector(
		(state: RootState) => state.problem_category,
	);

	useEffect(() => {
		dispatch(fetchCategories());
	}, []);

	if (loading) {
		return (
			<div className="relative min-h-screen flex items-center justify-center">
				<div className="flex flex-col  items-center justify-center ">
					<Loader className="w-6 h-6 text-slate-400 animate-spin " />
					<h3 className="font-semibold text-lg text-slate-400 ">
						Loading Problem categories...
					</h3>
				</div>
			</div>
		);
	}
	return (
		<div className="relative min-h-screen bg-[#020617] text-white overflow-hidden cursor-pointer">
			{/* 🌌 Background Effects */}
			<div className="absolute inset-0">
				{/* Grid */}
				<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

				{/* Glow */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full" />
			</div>

			{/* Content */}
			<div className="relative z-10 px-6 md:px-16 py-32">
				{/* 🚀 Hero Section */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold">
						Master Coding Challenges
					</h1>
					<p className="text-gray-400 mt-4 max-w-xl mx-auto">
						Improve your problem-solving skills with structured
						challenges and real-world patterns.
					</p>
				</div>

				{/* 📦 Categories */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{categories.map((cat, index) => {
						const progress =
							(cat.solvedProblems / cat.totalProblems) * 100;

						return (
							<div
								key={index}
								className="group flex items-center justify-between p-6 rounded-2xl 
								bg-white/5 backdrop-blur-xl border border-white/10 
								hover:bg-white/10 hover:scale-[1.02] transition-all duration-300"
								onClick={() =>
									navigate(`/problemset/${cat.name}`)
								}
							>
								{/* Left */}
								<div className="flex items-center gap-5">
									{/* Icon */}
									<img
										src={cat.imgUrl}
										className="w-20 h-20 rounded-xl bg-gradient-to-br 
                  from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold"
									/>

									{/* Content */}
									<div>
										<h3 className="text-lg font-semibold">
											{cat.title}
										</h3>

										{/* Tags */}
										<div className="flex flex-wrap gap-2 mt-2">
											{cat.tags.map((tag) => (
												<span
													key={tag}
													className="px-3 py-1 text-xs rounded-full 
                          bg-white/10 text-gray-300"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>

								{/* Right */}
								<div className="text-right">
									<p className="text-sm text-gray-400 mb-2">
										{cat.solvedProblems} /{" "}
										{cat.totalProblems}
									</p>

									{/* Progress bar */}
									<div className="w-28 h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
										<div
											className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
											style={{ width: `${progress}%` }}
										/>
									</div>

									<button className="text-sm text-blue-400 hover:text-blue-300 transition">
										View →
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
