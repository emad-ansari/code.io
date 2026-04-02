export default function WhyChooseSection() {
	return (
		<section className="container mx-auto px-6 mt-40 py-20 bg-white/2 rounded-[3rem] border border-white/5">
			<div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
				<div className="text-center">
					<div className="text-4xl font-bold text-white mb-2">
						2,500+
					</div>
					<div className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-4">
						Curated Problems
					</div>
					<p className="text-sm text-slate-400">
						From basic data structures to advanced dynamic
						programming.
					</p>
				</div>
				<div className="text-center">
					<div className="text-4xl font-bold text-white mb-2">
						99.9%
					</div>
					<div className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-4">
						Uptime SLA
					</div>
					<p className="text-sm text-slate-400">
						Reliable infrastructure that never interrupts your flow.
					</p>
				</div>
				<div className="text-center">
					<div className="text-4xl font-bold text-white mb-2">
						1M+
					</div>
					<div className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-4">
						Active Devs
					</div>
					<p className="text-sm text-slate-400">
						A thriving community of engineers from top tech
						companies.
					</p>
				</div>
			</div>
		</section>
	);
}
