import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";

import { useAppDispatch, RootState } from "@/client/app/store";
import { setUsername, setEmail, signup } from "@/client/features/authSlice";
import { Button } from "@/client/components/common/Button";
import { PasswordInputField } from "@/client/components/common/PasswordInputField";
import { Loader } from "lucide-react";

export const SignupPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { username, email, isSignup, isLoading } = useSelector(
		(state: RootState) => state.user
	);

	useEffect(() => {
		if (isSignup) {
			navigate("/login");
		}
	}, [dispatch, isSignup]);

	return (
		<main className="bg-code-bg  fixed top-0 right-0 left-0 bottom-0 flex justify-center pt-32">
			<div className="w-[350px] h-[400px] md:w-[450px] md:h-[550px]  rounded-3xl shadow-lg flex flex-col items-center border border-code-border">
				<h1 className="text-3xl text-white font-medium font-fugaz py-8">
					Code.io
				</h1>
				<h1 className="text-white text-xl font-normal  ">
					Welcome to Code.io
				</h1>
				<div className="flex flex-col gap-5 pt-5 w-[350px]">
					<input
						type="text"
						value={username}
						placeholder="Username"
						className="outline-none  rounded-lg border border-code-border px-3 py-2.5 bg-transparent text-white relative w-full text-sm"
						onChange={(e) => dispatch(setUsername(e.target.value))}
					/>
					<input
						type="email"
						value={email}
						placeholder="Email"
						className="outline-none  rounded-lg border border-code-border  px-3 py-2.5 bg-transparent text-white relative w-full text-sm"
						onChange={(e) => dispatch(setEmail(e.target.value))}
					/>
					<PasswordInputField />
					<Button
						classname="w-full bg-white  cursor-pointer text-sm font-medium shadow-lg rounded-lg h-10"
						onClick={() => dispatch(signup())}
					>
						{isLoading ? <Loader /> : <span>Sign up</span>}
					</Button>
					<div className="flex flex-row gap-4 items-center justify-between">
						<hr className="w-40 h-[1px]  bg-gray-200 border-0 dark:bg-gray-500" />
						<span className="text-white text-sm">OR</span>
						<hr className="w-40 h-[1px]  bg-gray-200 border-0 dark:bg-gray-500" />
					</div>
					<Button classname="w-full text-white bg-black items-center relative rounded-lg h-10 cursor-pointer">
						<FcGoogle
							style={{
								position: "absolute",
								top: "25%",
								left: "22%",
								fontSize: "22px",
							}}
						/>
						<span className="text-sm font-medium">
							Continue with google
						</span>
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
