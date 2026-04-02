export default function CommunitySection() {
	return (
		<section className="container mx-auto px-6 mt-40 text-center">
			<h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
				Join the elite 1%
			</h2>
			<p className="text-slate-400 mb-12 max-w-xl mx-auto">
				Code.io is where the world's best engineers sharpen their
				skills. Are you ready to level up?
			</p>
			<div className="flex justify-center -space-x-4 mb-12">
				{[1, 2, 3, 4, 5].map((i) => (
					<div
						key={i}
						className="w-14 h-14 rounded-full border-4 border-brand-bg bg-slate-800 overflow-hidden"
					>
						<img
							src={`https://picsum.photos/seed/user${i}/100/100`}
							alt="User"
							className="w-full h-full object-cover"
							referrerPolicy="no-referrer"
						/>
					</div>
				))}
				<div className="w-14 h-14 rounded-full border-4 border-brand-bg bg-brand-primary flex items-center justify-center text-white font-bold text-sm">
					+10k
				</div>
			</div>
			<button className="bg-white text-brand-bg px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform">
				Join the Community
			</button>
		</section>
	);
}
