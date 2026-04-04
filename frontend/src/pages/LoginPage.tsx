import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, RootState } from "@/app/store";
import { setError, login } from "@/features/authSlice";
import { motion } from "motion/react";
import { ArrowRight, Code2, Loader, Lock, Mail } from "lucide-react";
import { SocialButtons } from "@/components/common/social-button";
import { InputField } from "@/components/common/input-field";
import { validateEmail } from "@/lib/utils";

export const LoginPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { isLoggedIn, loading, error } = useSelector(
		(state: RootState) => state.auth,
	);
	console.log("loading: ", loading)

	const from = location.state?.from?.pathname || "/";

	// navigate user to the page,  where it was before login.
	useEffect(() => {
		if (isLoggedIn) {
			navigate(from, { replace: true });
		}
	}, [dispatch, isLoggedIn]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		const saved = email || password;
		if (!saved) {
			dispatch(setError("Each and every field is required*"));
			return;
		}

		if (!validateEmail(email)) {
			dispatch(setError("Please enter a valid email address"));
			return;
		}

		if (password.length < 6) {
			dispatch(setError("Password must be at least 6 characters"));
			return;
		}
		dispatch(login({ email, password }));
	};

	return (
		<main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-brand-bg">
			{/* Background Elements */}
			<div className="fixed inset-0 grid-background pointer-events-none opacity-50" />
			<div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/10 blur-[120px] rounded-full animate-pulse" />
			<div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-secondary/10 blur-[120px] rounded-full animate-pulse" />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="relative z-10 w-full max-w-md"
			>
				{/* Logo */}
				<div className="flex items-center gap-2 mb-8 justify-center cursor-pointer group">
					<div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform">
						<Code2 className="w-6 h-6 text-white" />
					</div>
					<span className="text-2xl font-bold tracking-tight text-white">
						Code.io
					</span>
				</div>

				{/* Card */}
				<div className="glass-card rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-white/10">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-white mb-2">
							Welcome Back
						</h1>
						<p className="text-slate-400 text-sm">
							Log in to continue your coding journey.
						</p>
					</div>

					<SocialButtons />
					<div className="relative mb-8">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-white/5"></div>
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-brand-bg px-2 text-slate-500 font-bold tracking-widest">
								Or continue with email
							</span>
						</div>
					</div>
					<div>
						<InputField
							icon={Mail}
							label="Email Address"
							type="email"
							placeholder="name@company.com"
							required
							onChange={(e) => setEmail(e.target.value)}
							onFocus={() => dispatch(setError(null))}
						/>
						<InputField
							icon={Lock}
							label="Password"
							type="password"
							placeholder="••••••••"
							required
							onChange={(e) => setPassword(e.target.value)}
							onFocus={() => dispatch(setError(null))}
						/>
						{error && (
							<span className=" text-red-500 text-xs">
								{error}
							</span>
						)}
						<div className="flex items-center justify-between mb-8 mt-2">
							<label className="flex items-center gap-2 cursor-pointer group">
								<input
									type="checkbox"
									className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-primary focus:ring-brand-primary/20"
								/>
								<span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
									Remember me
								</span>
							</label>
							<button
								type="button"
								className="text-xs text-brand-primary hover:underline underline-offset-4"
							>
								Forgot password?
							</button>
						</div>
						<button
							className="w-full py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 group cursor-pointer"
							onClick={handleLogin}
						>
							{loading ? (
								<div className="flex item-center gap-1">
									<Loader className="w-5 h-5 animate-spin" />
									<span>Loging...</span>
								</div>
							) : (
								<div className="flex items-center gap-1">
									<span>Log In</span>
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</div>
							)}
						</button>
					</div>

					<div className="mt-8 pt-8 border-t border-white/5 text-center">
						<p className="text-slate-400 text-sm">
							Don't have an account?
							<button
								onClick={() => navigate("/signup")}
								className="text-brand-primary font-bold hover:underline underline-offset-4 ml-1"
							>
								Sign up for free
							</button>
						</p>
					</div>
				</div>

				{/* Back to Home */}
				<button
					onClick={() => navigate("/")}
					className="mt-8 w-full text-slate-500 text-sm hover:text-slate-300 transition-colors flex items-center justify-center gap-2"
				>
					← Back to homepage
				</button>
			</motion.div>
		</main>
	);
};
