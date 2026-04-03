import { Suspense } from "react";
import HeroSection from "@/components/common/hero-section";
import CodePreview from "@/components/common/code-preview";
import FeaturesSection from "@/components/common/features";
import CommunitySection from "@/components/common/community";
import Footer from "@/components/common/footer";

const HomePage = () => {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<div className="relative min-h-screen overflow-x-hidden">
				{/* Background Grid & Spotlights */}
				<div className="fixed inset-0 grid-background pointer-events-none" />
				<div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/20 blur-[120px] rounded-full pointer-events-none" />
				<div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-secondary/20 blur-[120px] rounded-full pointer-events-none" />

				<main className="relative pt-32 pb-20">
					{/* Hero Section */}
					<HeroSection />

					{/* Interactive Code Preview */}
					<CodePreview />

					{/* Features Bento Grid */}
					<FeaturesSection />

					{/* Why Choose Section */}


					{/* Community / Trust Section */}
					<CommunitySection />
				</main>

				{/* Footer */}
				<Footer />
			</div>
		</Suspense>
	);
};
export default HomePage;

