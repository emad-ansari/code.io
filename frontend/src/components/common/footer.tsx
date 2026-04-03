import { Code2, Globe, Users } from "lucide-react";

export default function Footer() {
	return (
		<footer className="container mx-auto px-6 py-20 mt-20 border-t border-white/5">
			<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
				<div className="col-span-2 lg:col-span-2">
					<div className="flex items-center gap-2 mb-6">
						<div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
							<Code2 className="w-5 h-5 text-white" />
						</div>
						<span className="text-xl font-bold tracking-tight text-white">
							Code.io
						</span>
					</div>
					<p className="text-slate-400 max-w-xs mb-6">
						Building the future of technical education and interview
						preparation.
					</p>
					<div className="flex gap-4">
						<div className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:text-brand-primary transition-colors cursor-pointer">
							<Globe className="w-5 h-5" />
						</div>
						<div className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:text-brand-primary transition-colors cursor-pointer">
							<Users className="w-5 h-5" />
						</div>
					</div>
				</div>

				<div>
					<h4 className="text-white font-bold mb-6">Platform</h4>
					<ul className="space-y-4 text-sm text-slate-400">
						<li>
							<a
								href="#"
								className="hover:text-white transition-colors"
							>
								Problems
							</a>
						</li>
						<li>
							<a
								href="#"
								className="hover:text-white transition-colors"
							>
								Contests
							</a>
						</li>
						<li>
							<a
								href="#"
								className="hover:text-white transition-colors"
							>
								Discuss
							</a>
						</li>
						<li>
							<a
								href="#"
								className="hover:text-white transition-colors"
							>
								Interview
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h4 className="text-white font-bold mb-6">Company</h4>
					<ul className="space-y-4 text-sm text-slate-400">
						<li>
							<a
								href="#"
								className="hover:text-white transition-colors"
							>
								About Us
							</a>
						</li>
						<li>
							<a
								href="#"
								className="hover:text-white transition-colors"
							>
								Careers
							</a>
						</li>
						<li>
							<a
								href="#"
								className="hover:text-white transition-colors"
							>
								Privacy
							</a>
						</li>
						<li>
							<a
								href="#"
								className="hover:text-white transition-colors"
							>
								Terms
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h4 className="text-white font-bold mb-6">Support</h4>
					<ul className="space-y-4 text-sm text-slate-400">
						<li>
							<a
								href="#"
								className="hover:text-white transition-colors"
							>
								Help Center
							</a>
						</li>
						<li>
							<a
								href="#"
								className="hover:text-white transition-colors"
							>
								Contact
							</a>
						</li>
						<li>
							<a
								href="#"
								className="hover:text-white transition-colors"
							>
								Status
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="flex flex-col md:row items-center justify-between gap-6 pt-12 border-t border-white/5 text-xs text-slate-500">
				<p>© 2025 Code.io Inc. All rights reserved.</p>
				<div className="flex gap-8">
					<a href="#" className="hover:text-white transition-colors">
						Privacy Policy
					</a>
					<a href="#" className="hover:text-white transition-colors">
						Terms of Service
					</a>
					<a href="#" className="hover:text-white transition-colors">
						Cookie Settings
					</a>
				</div>
			</div>
		</footer>
	);
}
