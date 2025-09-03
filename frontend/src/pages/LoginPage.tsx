import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, RootState, store } from "@/app/store";
import { setEmail, login } from "@/features/authSlice";
import { PasswordInputField } from "@/components/common/PasswordInputField";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";

export const LoginPage = () => {
	const { email, isLogin, loading, error } = useSelector(
		(state: RootState) => state.auth
	);
	const dispatch = useAppDispatch();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	// navigate user to the page,  where it was before login.
	useEffect(() => {
		if (isLogin) {
			navigate(from, { replace: true });
		}
	}, [dispatch, isLogin]);

	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);

	const validateEmail = (value: string) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(value);
	};

	const hasServerError = useMemo(() => Boolean(error), [error]);

	const handleLogin = () => {
		let valid = true;
		if (!validateEmail(email)) {
			setEmailError("Please enter a valid email address");
			valid = false;
		} else {
			setEmailError(null);
		}
		// Password is stored in auth slice, but input is in PasswordInputField
		// We will read it directly from store to validate minimal length
		const password = (store.getState() as RootState).auth.password;
		if (!password || password.length < 5) {
			setPasswordError("Password must be at least 6 characters");
			valid = false;
		} else {
			setPasswordError(null);
		}
		if (!valid) return;
		dispatch(login());
	};

	return (
		<main className="bg-code-bg flex items-center justify-center  h-screen">
			<div className=" h-[400px] w-[400px] md:w-[450px] md:h-[500px]  shadow-md shadow-slate-700/30  rounded-2xl flex flex-col items-center border border-code-border box-border">
				<h1 className="text-3xl text-white font-medium font-fugaz py-8">
					Code.io
				</h1>
				<h1 className="text-gray-300 text-lg font-inter tracking-normal">
					Login to your account
				</h1>
				<div className="flex flex-col  gap-5 pt-5  w-[350px]">
					<div className="flex flex-col gap-2">
						<Input
							type="email"
							placeholder="Email"
							value={email}
							className="outline-none rounded-lg border border-code-border  px-3 py-3 bg-transparent text-white relative w-full text-sm focus:ring-3 focus:ring-code-dark/50 placeholder:text-gray-400"
							onChange={(e) => {
								const value = e.target.value;
								dispatch(setEmail(value));
								if (value && validateEmail(value)) setEmailError(null);
							}}
						/>
						{emailError && (
							<span className="text-red-400 text-xs">{emailError}</span>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<PasswordInputField  unSetPasswordError={setPasswordError}/>
						{passwordError && (
							<span className="text-red-400 text-xs">{passwordError}</span>
						)}
					</div>
					{hasServerError && !emailError && !passwordError && (
						<div className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
							{error}
						</div>
					)}
					<Button
						className={`w-full bg-code-orange h-10 cursor-pointer text-sm font-medium rounded-lg `}
						onClick={handleLogin}
					>
						{loading ? (
							<div className="flex items-center justify-center gap-2">
								<Loader
									className={`${loading && "animate-spin"}`}
								/>
								<span>Logging in...</span>
							</div>
						) : (
							<span>Log In</span>
						)}
					</Button>
					<div className="flex flex-row justify-between items-center">
						<span className="text-[#EB8069] text-sm cursor-pointer">
							Forgot password
						</span>
						<span className="text-white text-sm">
							Don't have an account?{" "}
							<a
								href="signup"
								className=" font-medium italic cursor-pointer text-code-orange"
							>
								Sign up
							</a>
						</span>
					</div>
				</div>
			</div>
		</main>
	);
};
