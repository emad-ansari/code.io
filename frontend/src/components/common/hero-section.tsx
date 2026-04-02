import { ChevronRight, Zap } from "lucide-react";
import { motion } from "motion/react";


export default function HeroSection () {
    return (
        <section className="container mx-auto px-6 text-center relative">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="max-w-4xl mx-auto"
						>
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold mb-8">
								<Zap className="w-3 h-3" />
								<span>NEW: AI-POWERED CODE ASSISTANT</span>
							</div>
							<h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
								Master Coding with <br />
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
									Futuristic Precision
								</span>
							</h1>
							<p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
								The ultimate platform for developers to solve
								challenges, learn system design, and prepare for
								top-tier tech interviews.
							</p>
							<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
								<button className="w-full sm:w-auto bg-white text-brand-bg px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 group">
									Start Coding Now
									<ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</button>
								<button className="w-full sm:w-auto glass-card px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors">
									View Problems
								</button>
							</div>
						</motion.div>

						{/* Floating Code Snippets */}
						<motion.div
							animate={{ y: [0, -10, 0] }}
							transition={{
								duration: 4,
								repeat: Infinity,
								ease: "easeInOut",
							}}
							className="absolute top-20 -left-10 hidden xl:block glass-card p-4 rounded-xl rotate-[-12deg] opacity-50"
						>
							<pre className="text-xs font-mono text-brand-primary">
								<code>{`function solve(n) {\n  return n <= 1 ? n : \n    solve(n-1) + solve(n-2);\n}`}</code>
							</pre>
						</motion.div>
						<motion.div
							animate={{ y: [0, 10, 0] }}
							transition={{
								duration: 5,
								repeat: Infinity,
								ease: "easeInOut",
							}}
							className="absolute bottom-0 -right-10 hidden xl:block glass-card p-4 rounded-xl rotate-[8deg] opacity-50"
						>
							<pre className="text-xs font-mono text-brand-secondary">
								<code>{`class Solution {\n  public int maxProfit(int[] p) {\n    // Dynamic Programming\n  }\n}`}</code>
							</pre>
						</motion.div>
					</section>
    )
}
