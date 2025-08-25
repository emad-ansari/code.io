import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { useAppDispatch, RootState } from "@/app/store";
import { setEmail, login } from "@/features/authSlice";
import { PasswordInputField } from "@/components/common/PasswordInputField";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";

export const LoginPage = () => {
	const { email, isLogin, loading } = useSelector(
		(state: RootState) => state.user
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
					<Input
						type="email"
						placeholder="Email"
						value={email}
						className="outline-none rounded-lg border border-code-border  px-3 py-3 bg-transparent text-white relative w-full text-sm focus:ring-3 focus:ring-code-dark/50 placeholder:text-gray-400"
						onChange={(e) => dispatch(setEmail(e.target.value))}
					/>
					<PasswordInputField />
					<Button
						className={`w-full bg-code-orange h-10 cursor-pointer text-sm font-medium rounded-lg `}
						onClick={() => {
							dispatch(login());
						}}
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
