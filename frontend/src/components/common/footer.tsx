import { Terminal } from "lucide-react";
import { Link } from "react-router-dom";

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

export const Footer = () => {
	return (
		<footer className="border-t border-[#374151] bg-code-bg flex justify-center">
			<div className="flex flex-col justify-center pt-12">
				<div className="grid gap-8 md:grid-cols-4 px-[74px]">
					<div className="space-y-4">
						<Link to="/" className="flex items-center space-x-2">
							<div className="bg-[#1f2937] rounded-lg p-1.5">
								<Terminal className="h-5 w-5 text-white" />
							</div>
							<span className="text-xl font-bold text-white">
								Code.io
							</span>
						</Link>
						<p className="text-sm text-gray-400">
							Empowering developers to excel through practice and
							collaboration.
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
	);
};
