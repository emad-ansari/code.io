import { Code2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
	const navigate = useNavigate();

	return (
		<nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
			<div className="glass-card rounded-full px-6 py-3 flex items-center justify-between">
				<Link className="flex items-center gap-2" to = "/">
					<div className="w-8 h-8 bg-gradient-to-br from-brand-a to-brand-secondary rounded-lg flex items-center justify-center shadow-lg shadow-brand-primary/20">
						<Code2 className="w-5 h-5 text-white" />
					</div>
					<span className="text-xl font-bold tracking-tight text-white">
						Code.io
					</span>
				</Link>

				<div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
					<a href="/problemset" className="hover:text-white transition-colors">
						Problemset
					</a>
					<a href="#" className="hover:text-white transition-colors">
						Contests
					</a>
					<a href="#" className="hover:text-white transition-colors">
						Courses
					</a>
					<a href="#" className="hover:text-white transition-colors">
						Community
					</a>
				</div>

				<div className="flex items-center gap-4">
					<button className="text-sm font-medium text-slate-300 hover:text-white transition-colors" onClick={() => navigate('/login')}>
						Log In
					</button>
					<button className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-brand-primary/25 hover:scale-105 transition-transform active:scale-95" onClick={() => navigate('/signup')}>
						Get Started
					</button>
				</div>
			</div>
		</nav>
	);
}
