import { Cpu, Globe, Terminal, Trophy, Users } from 'lucide-react';
import {motion } from 'motion/react';

export default function FeaturesSection() {
	return (
		<section className="container mx-auto px-6 mt-40">
			<div className="text-center mb-16">
				<h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
					Everything you need to grow
				</h2>
				<p className="text-slate-400">
					A comprehensive ecosystem for modern engineering.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
				{/* Large Card */}
				<motion.div
					whileHover={{ y: -5 }}
					className="md:col-span-2 glass-card p-8 rounded-[2.5rem] relative overflow-hidden group"
				>
					<div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
						<Cpu className="w-32 h-32 text-brand-primary" />
					</div>
					<div className="relative z-10">
						<div className="w-12 h-12 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
							<Terminal className="w-6 h-6 text-brand-primary" />
						</div>
						<h3 className="text-2xl font-bold text-white mb-3">
							Real-time Code Execution
						</h3>
						<p className="text-slate-400 max-w-md">
							Run your code across 50+ languages with instant
							feedback and detailed performance analytics.
						</p>
					</div>
				</motion.div>

				{/* Small Card */}
				<motion.div
					whileHover={{ y: -5 }}
					className="glass-card p-8 rounded-[2.5rem] group"
				>
					<div className="w-12 h-12 bg-brand-secondary/20 rounded-2xl flex items-center justify-center mb-6">
						<Trophy className="w-6 h-6 text-brand-secondary" />
					</div>
					<h3 className="text-2xl font-bold text-white mb-3">
						Compete
					</h3>
					<p className="text-slate-400">
						Join weekly contests and climb the global leaderboard.
					</p>
				</motion.div>

				{/* Small Card */}
				<motion.div
					whileHover={{ y: -5 }}
					className="glass-card p-8 rounded-[2.5rem] group"
				>
					<div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
						<Globe className="w-6 h-6 text-emerald-500" />
					</div>
					<h3 className="text-2xl font-bold text-white mb-3">
						System Design
					</h3>
					<p className="text-slate-400">
						Master distributed systems with interactive diagrams.
					</p>
				</motion.div>

				{/* Large Card */}
				<motion.div
					whileHover={{ y: -5 }}
					className="md:col-span-2 glass-card p-8 rounded-[2.5rem] relative overflow-hidden group"
				>
					<div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
						<Users className="w-32 h-32 text-brand-secondary" />
					</div>
					<div className="relative z-10">
						<div className="w-12 h-12 bg-brand-secondary/20 rounded-2xl flex items-center justify-center mb-6">
							<Users className="w-6 h-6 text-brand-secondary" />
						</div>
						<h3 className="text-2xl font-bold text-white mb-3">
							Collaborative Learning
						</h3>
						<p className="text-slate-400 max-w-md">
							Pair program with friends or join study groups to
							solve complex algorithmic problems together.
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
