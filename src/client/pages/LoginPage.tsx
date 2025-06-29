import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { useAppDispatch, RootState } from "@/client/app/store";
import { setEmail, login } from "@/client/features/authSlice";
import { PasswordInputField } from "@/client/components/common/PasswordInputField";
import { Button } from "@/client/components/common/Button";


export const LoginPage = () => {
	const { email, isLogin } = useSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();
	
	const navigate = useNavigate();
	const location = useLocation();
	const  from = location.state?.from?.pathname || "/";
	
	// navigate user to the page,  where it was before login.
	useEffect(() => {
	    if (isLogin){
			navigate(from, { replace: true });
	    }
	}, [dispatch, isLogin ])

	return (
		<main className="bg-code-bg  fixed top-0 right-0 left-0 bottom-0 flex justify-center pt-32 ">
			<div className="w-[350px] h-[400px] md:w-[450px] md:h-[500px]  shadow-lg  rounded-2xl flex flex-col items-center border border-code-border">
				<h1 className = "text-3xl text-white font-medium font-fugaz py-8">Code.io</h1>
				<h1 className="text-white text-xl font-normal  ">
					Login to your account
				</h1>
				<div className="flex flex-col  gap-5 pt-5  w-[350px]">
					<input
						type="email"
						placeholder="Email"
						value={email}
						className="outline-none rounded-lg border border-code-border  px-3 py-3 bg-transparent text-white relative w-full text-sm"
						onChange={(e) => dispatch(setEmail(e.target.value))}
					/>
					<PasswordInputField />
					<Button
						classname="w-full bg-[#EB8069]  h-10 cursor-pointer text-sm font-medium  rounded-lg"
						onClick={() => dispatch(login())}
					>
						Log In
					</Button>
					<div className="flex flex-row gap-4 items-center justify-between">
						<hr className="w-40 h-[1px]  bg-gray-200 border-0 dark:bg-gray-500" />
						<span className="text-white text-sm">OR</span>
						<hr className="w-40 h-[1px]  bg-gray-200 border-0 dark:bg-gray-500" />
					</div>
					<Button classname="w-full text-white bg-black items-center relative rounded-md">
						<FcGoogle
							style={{
								position: "absolute",
								top: "25%",
								left: "22%",
								fontSize: "22px",
							}}
						/>
						<span className="text-sm font-medium">
							Log In with google
						</span>
					</Button>
					<div className="flex flex-row justify-between items-center">
						<span className="text-[#EB8069] text-sm cursor-pointer">
							Forgot password
						</span>
						<span className="text-white text-sm">
							Don't have an account?{" "}
							<a
								href="/signup"
								className=" font-medium italic cursor-pointer text-[#EB8069]"
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
