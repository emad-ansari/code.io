import { Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

import { Button } from "../components/ui/button";
import coding from "@/assets/coding-boy.svg";
import {
	ArrowRight,
	Brain,
	ChevronRight,
	Terminal,
	Trophy,
	Users,
} from "lucide-react";

const features = [
	{
		icon: <Brain className="h-6 w-6" />,
		title: "Smart Learning Path",
		description:
			"Personalized problem recommendations based on your skill level and progress.",
	},
	{
		icon: <Trophy className="h-6 w-6" />,
		title: "Weekly Contests",
		description:
			"Compete with developers worldwide in our weekly coding competitions.",
	},
	{
		icon: <Users className="h-6 w-6" />,
		title: "Active Community",
		description:
			"Learn from peers, share solutions, and grow together with our community.",
	},
];

const footerLinks = [
	{
		title: "Product",
		links: ["Problems", "Contests", "Leaderboard", "Premium"],
	},
	{
		title: "Company",
		links: ["About", "Careers", "Blog", "Press"],
	},
	{
		title: "Resources",
		links: ["Documentation", "Help Center", "Community", "Contact"],
	},
];

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<Suspense fallback={<p>Loading...</p>}>
			<main className="bg-[#111827] py-16 h-screen">
				<div className="grid md:grid-cols-2 gap-6">
					<div className="md:pt-22 pt-8 flex flex-col items-center gap-20 justify-center">
						<p className=" w-full  px-[18px] md:px-10 font-fugaz font-bold  text-white text-[28px] md:text-4xl text-center  leading-[1.5] md:leading-[1.5] md:tracking-[1.5px] tracking-[0.5px]">
							Master Coding Challenges and Enhance Problem-Solving
							Skills with Code.io
						</p>
						<Button
							className="w-[50%] h-12 text-black bg-[#EB8069] cursor-pointer font-semibold rounded-full flex gap-5 text-justify border border-code-border"
							onClick={() => navigate("/signup")}
						>
							<span className="flex text-justify  ">
								Start Coding Now
							</span>
							<FaArrowRightLong className=" pt-1" />
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
							<h2 className="text-3xl md:text-4xl font-bold text-white">
								Why Developers Choose Code.io
							</h2>
							<p className="text-gray-300 max-w-2xl mx-auto">
								Join a community of passionate developers and
								take your coding skills to the next level.
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							{features.map((feature, index) => (
								<div
									key={index}
									className="group relative overflow-hidden rounded-lg  border-[1.5px] border-slate-800 p-8  duration-300 hover:shadow-lg hover:shadow-gray-600 transition"
								>
									<div className="relative space-y-4">
										<div className="inline-flex items-center justify-center rounded-lg bg-[#374151] p-3 text-white">
											{feature.icon}
										</div>
										<h3 className="text-xl font-semibold text-white">
											{feature.title}
										</h3>
										<p className="text-gray-300">
											{feature.description}
										</p>
										<Button className="text-gray-300   hvoer:bg-none p-0">
											Learn more{" "}
											<ChevronRight className="ml-1 h-4 w-4" />
										</Button>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-20 relative flex justify-center bg-code-bg px-4 md:px-16">
					<div >
						<div className="relative overflow-hidden rounded-lg  border-[1.5px]  border-slate-800 transition duration-300 hover:shadow-lg hover:shadow-gray-600 ">
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
									onClick={() => navigate('/signup')}
								>
									Create Free Account
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>
				</section>

				{/* Footer */}
				<footer className="border-t border-[#374151] bg-code-bg flex justify-center">
					<div className="flex flex-col justify-center pt-12">
						<div className="grid gap-8 md:grid-cols-4 px-[74px]">
							<div className="space-y-4">
								<Link
									to="/"
									className="flex items-center space-x-2"
								>
									<div className="bg-[#1f2937] rounded-lg p-1.5">
										<Terminal className="h-5 w-5 text-white" />
									</div>
									<span className="text-xl font-bold text-white">
										Code.io
									</span>
								</Link>
								<p className="text-sm text-gray-400">
									Empowering developers to excel through
									practice and collaboration.
								</p>
							</div>
							{footerLinks.map((column, index) => (
								<div key={index} className="space-y-4">
									<h4 className="font-semibold text-white">
										{column.title}
									</h4>
									<ul className="space-y-2">
										{column.links.map((link, linkIndex) => (
											<li key={linkIndex}>
												<a
													href="#"
													className="text-sm text-gray-400 hover:text-white transition-colors"
												>
													{link}
												</a>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
						<div className="mt-12 h-16 border-t border-[#374151] text-sm text-gray-400 flex justify-center bg-code-bg items-center">
							<p>
								© {new Date().getFullYear()} Code.io. All rights
								reserved.
							</p>
						</div>
					</div>
				</footer>
			</main>
		</Suspense>
	);
};
export default HomePage;

// 1f2937
