import {motion } from 'motion/react'

export default function CodePreview() {
	return (
		<section className="container mx-auto px-6 mt-32">
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: true }}
				className="relative max-w-5xl mx-auto group"
			>
				<div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
				<div className="relative glass-card rounded-[2rem] overflow-hidden shadow-2xl">
					<div className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-red-500/50" />
							<div className="w-3 h-3 rounded-full bg-yellow-500/50" />
							<div className="w-3 h-3 rounded-full bg-green-500/50" />
							<span className="ml-4 text-xs font-mono text-slate-500">
								Solution.ts — Code.io Editor
							</span>
						</div>
						<div className="flex items-center gap-4">
							<span className="text-xs font-mono text-slate-500">
								TypeScript
							</span>
							<div className="px-3 py-1 rounded bg-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-wider">
								Running
							</div>
						</div>
					</div>
					<div className="grid md:grid-cols-2 h-[400px]">
						<div className="p-8 font-mono text-sm leading-relaxed border-r border-white/10 overflow-hidden">
							<div className="flex gap-4">
								<span className="text-slate-600">1</span>
								<span className="text-brand-primary">
									async function
								</span>
								<span className="text-white">
									fetchData() &#123;
								</span>
							</div>
							<div className="flex gap-4">
								<span className="text-slate-600">2</span>
								<span className="ml-4 text-brand-secondary">
									const
								</span>
								<span className="text-white">res = </span>
								<span className="text-brand-primary">
									await
								</span>
								<span className="text-white">api.get(</span>
								<span className="text-emerald-400">
									"/users"
								</span>
								<span className="text-white">);</span>
							</div>
							<div className="flex gap-4">
								<span className="text-slate-600">3</span>
								<span className="ml-4 text-brand-primary">
									return
								</span>
								<span className="text-white">res.data;</span>
							</div>
							<div className="flex gap-4">
								<span className="text-slate-600">4</span>
								<span className="text-white">&#125;</span>
							</div>
							<div className="flex gap-4 mt-4">
								<span className="text-slate-600">5</span>
								<span className="text-slate-500">
									// Optimized for 2025 runtime
								</span>
							</div>
						</div>
						<div className="bg-black/40 p-8 font-mono text-sm">
							<div className="text-slate-500 mb-4 uppercase text-[10px] font-bold tracking-widest">
								Console Output
							</div>
							<div className="text-emerald-400 mb-2">
								✓ Compilation successful
							</div>
							<div className="text-white mb-2">
								Fetching data from edge nodes...
							</div>
							<div className="text-slate-400">Latency: 12ms</div>
							<div className="text-slate-400">Memory: 4.2MB</div>
							<div className="mt-8">
								<div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
									<motion.div
										initial={{ width: 0 }}
										whileInView={{
											width: "85%",
										}}
										transition={{
											duration: 2,
											delay: 0.5,
										}}
										className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary"
									/>
								</div>
								<div className="flex justify-between mt-2 text-[10px] text-slate-500">
									<span>Performance Score</span>
									<span>85%</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</section>
	);
}
