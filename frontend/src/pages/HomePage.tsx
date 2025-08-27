import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../components/ui/button";
import { Footer } from "@/components/common/footer";
import coding from "@/assets/coding-boy.svg";

import {
	ArrowRight,
	ChartBarStacked,
	CodeXml,
	Users,
} from "lucide-react";


const features = [
	{
		icon: <ChartBarStacked className="h-6 w-6" />,
		title: "Category-wise Problems",
		description:
			"Practice coding challenges organized into categories, making it easy to learn step by step.",
	},
	{
		icon: <CodeXml className="h-6 w-6" />,
		title: "Multi-Language Support",
		description:
			"Write and run code in multiple programming languages without switching tools.",
	},
	{
		icon: <Users className="h-6 w-6" />,
		title: "Active Community",
		description:
			"Learn from peers, share solutions, and grow together with our community.",
	},
];

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<Suspense fallback={<p>Loading...</p>}>
			<main className="bg-[#111827] py-16 h-screen">
				<div className="grid md:grid-cols-2 gap-6">
					<div className="md:pt-22 pt-8 flex flex-col items-center gap-20 justify-center">
						<p className=" w-full  text-2xl px-5 md:px-10 font-inter font-bold  text-gray-300 md:text-4xl text-center  leading-[1.5] md:leading-[1.5] md:tracking-[1.5px] text-gradient-to-r from-[#0f172a]  to-[#334155]">
							Master Coding Challenges and Enhance Problem-Solving
							Skills with Code.io
						</p>
						<Button
							variant={"default"}
							className="w-[45%] h-12 text-gray-300 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#0f172a]  to-[#334155] cursor-pointer font-semibold rounded-2xl flex gap-5 text-justify border border-slate-700/50 transition-all shadow-md shadow-slate-700/50 duration-300"
							onClick={() => navigate("/signup")}
						>
							<span className="flex text-justify">
								Start Coding Now
							</span>
							<FaArrowRightLong className=" pt-1 " />
						</Button>
					</div>
					<div className=" flex items-center justify-center bg-code-bg">
						<img
							src={coding}
							alt=""
							className="md:w-[85%] md:h-[85%] w-[80%] h-[80%] cursor-pointer "
						/>
					</div>
				</div>
				<section className="bg-code-bg py-12 md:py-32 flex justify-center px-4 md:px-16">
					<div className="flex flex-wrap  justify-center">
						<div className="text-center space-y-4 mb-16">
							<div className="bg-green-500/10 inline-block px-3 py-1 rounded-full border border-green-400/20 shadow-md shadow-green-500/10">
								<span className="text-green-500 text-sm">
									Features
								</span>
							</div>
							<p className="text-gray-300 max-w-2xl mx-auto">
								Join a community of passionate developers and
								take your coding skills to the next level.
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							{features.map((feature, index) => (
								<div
									key={index}
									className="group relative overflow-hidden rounded-lg  border-[1.5px] border-slate-800 p-8  shadow-lg shadow-gray-700/40   "
								>
									<div className="relative space-y-4">
										<div className="inline-flex items-center justify-center rounded-full bg-gray-700 p-3 text-white">
											{feature.icon}
										</div>
										<h3 className="text-xl font-semibold text-gray-300">
											{feature.title}
										</h3>
										<p className="text-gray-300">
											{feature.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-20 relative flex justify-center bg-code-bg px-4 md:px-16">
					<div>
						<div className="relative overflow-hidden rounded-lg border-[1.5px]  border-slate-800 shadow-lg shadow-gray-700/40  ">
							<div className="p-8 md:p-12 lg:p-16 text-center">
								<h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
									Ready to Start Your Coding Journey?
								</h2>
								<p className="text-md text-gray-300 mb-8 max-w-2xl mx-auto">
									Join thousands of developers who are already
									improving their coding skills with Code.io
								</p>
								<Button
									size="lg"
									className=" text-white hover:bg-slate-700 text-base border-[1.5px] border-slate-800 transition duration-300"
									onClick={() => navigate("/signup")}
								>
									Create Free Account
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>
				</section>
				{/* Footer */}
				<Footer />
			</main>
		</Suspense>
	);
};
export default HomePage;

// 1f2937
