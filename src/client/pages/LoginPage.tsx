import logo from "../../assets/siginLogo.svg";
import { PasswordInputField } from "../components/common/PasswordInputField";
import { Button } from "../components/common/Button";
import { FcGoogle } from "react-icons/fc";
import { useAppDispatch, RootState } from "../app/store";
import { useSelector } from "react-redux";
import { setEmail, login } from "../features/authSlice";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
	const { email } = useSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();
	// const navigate = useNavigate();
	// useEffect(() => {
	//     if (isLogin){
	//         navigate('/p/problemset')
	//     }
	// }, [dispatch, isLogin ])
	return (
		<main className="bg-[#030303]  fixed top-0 right-0 left-0 bottom-0 flex justify-center pt-32 ">
			<div className="w-[350px] h-[400px] md:w-[450px] md:h-[500px]  bg-[#0D1621] rounded-lg flex flex-col items-center border border-[#334155]">
				<img src={logo} className="w-[110px] h-[110px] " />
				<h1 className="text-white text-xl  [font-family:'Inria_Sans-Bold',Helvetica] tracking-[2px] leading-[normal] font-bold">
					Log In to your account
				</h1>
				<div className="flex flex-col gap-5 pt-5  w-[350px]">
					<input
						type="email"
						placeholder="Email"
						value={email}
						className="focus:outline-none focus:ring focus:ring-offset-[#81E291] rounded-md border  px-3 py-3 bg-transparent text-white relative w-full text-sm"
						onChange={(e) => dispatch(setEmail(e.target.value))}
					/>
					<PasswordInputField />
					<Button
						classname="w-full bg-cyan text-sm font-medium hover:bg-[#a5f3fc] rounded-md"
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
						<span className="text-red-400 text-sm cursor-pointer">
							Forgot password
						</span>
						<span className="text-white text-sm">
							Don't have an account?{" "}
							<a
								href="/signup"
								className="text-white font-semibold italic cursor-pointer hover:text-red-400"
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
