import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAppDispatch, RootState } from "@/app/store";
import { setUsername, setEmail, signup } from "@/features/authSlice";
import { Button } from "@/components/ui/button";
import { PasswordInputField } from "@/components/common/PasswordInputField";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SignupPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { username, email, isSignup, loading } = useSelector(
		(state: RootState) => state.auth
	);

	useEffect(() => {
		if (isSignup) {
			navigate("/login");
		}
	}, [dispatch, isSignup]);

	return (
		<main className="bg-code-bg flex justify-center pt-32 h-screen">
			<div className=" h-[480px] w-[400px]  md:w-[450px] md:h-[500px]  rounded-3xl shadow-md shadow-slate-700/30 flex flex-col items-center border border-code-border ">
				<h1 className="text-3xl text-white font-medium font-fugaz py-8">
					Code.io
				</h1>
				<h1 className="text-gray-400 text-lg font-inter-medium tracking-wider">
					Welcome to Code.io
				</h1>
				<div className="flex flex-col gap-5 pt-5 w-[350px]">
					<Input
						type="text"
						value={username}
						placeholder="Username"
						className="  rounded-lg border border-code-border px-3 py-2.5 bg-transparent text-white relative w-full text-sm focus:ring-3 focus:ring-code-dark/50 placeholder:text-gray-400" 
						onChange={(e) => dispatch(setUsername(e.target.value))}
					/>
					<Input
						type="email"
						value={email}
						placeholder="Email"
						className="outline-none  rounded-lg border border-code-border  px-3 py-2.5 bg-transparent text-white relative w-full text-sm focus:ring-3 focus:ring-code-dark/50 placeholder:text-gray-400"
						onChange={(e) => dispatch(setEmail(e.target.value))}
					/>
					<PasswordInputField />
					<Button
						className="w-full cursor-pointer text-sm font-medium shadow-lg rounded-lg h-10 bg-code-orange "
						onClick={() => dispatch(signup())}
					>
						{loading ? (
							<div className = "flex flex-row items-center justify-center gap-2">
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
