import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAppDispatch, RootState, store } from "@/app/store";
import { setUsername, setEmail, signup } from "@/features/authSlice";
import { Button } from "@/components/ui/button";
import { PasswordInputField } from "@/components/common/PasswordInputField";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SignupPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { username, email, isSignup, loading, error } = useSelector(
		(state: RootState) => state.auth
	);

	useEffect(() => {
		if (isSignup) {
			navigate("/login");
		}
	}, [dispatch, isSignup]);

	const [usernameError, setUsernameError] = useState<string | null>(null);
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);

	const validateEmail = (value: string) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(value);
	};

	const hasServerError = useMemo(() => Boolean(error), [error]);

	const handleSignup = () => {
		let valid = true;
		if (!username || username.trim().length < 3) {
			setUsernameError("Username must be at least 3 characters");
			valid = false;
		} else {
			setUsernameError(null);
		}
		if (!validateEmail(email)) {
			setEmailError("Please enter a valid email address");
			valid = false;
		} else {
			setEmailError(null);
		}
		const password = (store.getState() as RootState).auth.password;
		if (!password || password.length < 6) {
			setPasswordError("Password must be at least 6 characters");
			valid = false;
		} else {
			setPasswordError(null);
		}
		if (!valid) return;
		dispatch(signup());
	};

	return (
		<main className="bg-code-bg flex justify-center pt-32 h-screen">
			<div className=" h-[480px] w-[400px]  md:w-[450px] md:h-[500px]  rounded-3xl shadow-lg shadow-gray-700/30 flex flex-col items-center border border-code-border ">
				<h1 className="text-3xl text-white font-medium font-fugaz py-8">
					Code.io
				</h1>
				<h1 className="text-gray-400 text-lg font-inter-medium tracking-wider">
					Welcome to Code.io
				</h1>
				<div className="flex flex-col gap-5 pt-5 w-[350px]">
					<div className="flex flex-col gap-2">
						<Input
							type="text"
							value={username}
							placeholder="Username"
							className="  rounded-lg border border-code-border px-3 py-2.5 bg-transparent text-white relative w-full text-sm focus:ring-3 focus:ring-code-dark/50 placeholder:text-gray-400"
							onChange={(e) => {
								setUsername("")
								const value = e.target.value;
								dispatch(setUsername(value));
								if (value && value.trim().length >= 3)
									setUsernameError(null);
							}}
						/>
						{usernameError && (
							<span className="text-red-400 text-xs">
								{usernameError}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<Input
							type="email"
							value={email}
							placeholder="Email"
							className="outline-none  rounded-lg border border-code-border  px-3 py-2.5 bg-transparent text-white relative w-full text-sm focus:ring-3 focus:ring-code-dark/50 placeholder:text-gray-400"
							onChange={(e) => {
								setEmailError("");
								const value = e.target.value;
								dispatch(setEmail(value));
								if (value && validateEmail(value))
									setEmailError(null);
							}}
						/>
						{emailError && (
							<span className="text-red-400 text-xs">
								{emailError}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<PasswordInputField unSetPasswordError = {setPasswordError}/>
						{passwordError && (
							<span className="text-red-400 text-xs">
								{passwordError}
							</span>
						)}
					</div>
					{hasServerError &&
						!usernameError &&
						!emailError &&
						!passwordError && (
							<div className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
								{error}
							</div>
						)}
					<Button
						className="w-full cursor-pointer text-sm font-medium shadow-lg rounded-lg h-10 bg-code-orange "
						onClick={handleSignup}
					>
						{loading ? (
							<div className="flex flex-row items-center justify-center gap-2">
								<Loader className="w-5 h-5 animate-spin" />
								<span>Signing up...</span>
							</div>
						) : (
							<span>Sign up</span>
						)}
					</Button>
					<div className="flex flex-row justify-start items-center">
						<span className="text-white text-sm">
							Already have an account?{" "}
							<a
								href="/login"
								className=" font-semibold italic cursor- text-red-400"
							>
								Log In
							</a>
						</span>
					</div>
				</div>
			</div>
		</main>
	);
};
