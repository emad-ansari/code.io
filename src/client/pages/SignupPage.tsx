import { Button } from "../components/common/Button";
import logo from "../../assets/siginLogo.svg";
import { PasswordInputField } from "../components/common/PasswordInputField";
import { FcGoogle } from "react-icons/fc";
import { setUsername, setEmail, signup } from "../features/userSlice";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../app/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const SignupPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { username, email, isSignup } = useSelector((state: RootState) => state.user);
	console.log('user form: ', username, email)
	useEffect(() => {
		if (isSignup){
			navigate ('/login')
			// make isSignup false over here
		}
	}, [dispatch, isSignup])

	return (
		<main className="bg-[#030303]  fixed top-0 right-0 left-0 bottom-0 flex justify-center pt-32">
			<div className="w-[350px] h-[400px] md:w-[450px] md:h-[550px]  bg-[#0D1621] rounded-lg flex flex-col items-center border border-[#334155] ">
				<img src={logo} alt="logo" className="w-[110px] h-[110px]" />
				<h1 className="text-white text-xl font-medium">
					Create your account
				</h1>
				<div className="flex flex-col gap-5 pt-5  w-[350px]">
					<input
						type="text"
						value = {username}
						placeholder="Username"
						className="focus:outline-none focus:ring focus:ring-offset-[#81E291] rounded-md border  px-3 py-3 bg-transparent text-white relative w-full text-sm"
						onChange = {(e) => dispatch(setUsername(e.target.value))}
					/>
					<input
						type="email"
						value = {email}
						placeholder="Email"
						className="focus:outline-none focus:ring focus:ring-offset-[#81E291] rounded-md border  px-3 py-3 bg-transparent text-white relative w-full text-sm"
						onChange = {(e) => dispatch(setEmail(e.target.value))}
					/>
					<PasswordInputField  />
					<Button
						classname="w-full bg-[#cffafe] text-sm font-medium shadow-lg rounded-md"
						onClick={() => dispatch(signup())}
					>
						Sign up
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
							Continue with google
						</span>
					</Button>
					<div className="flex flex-row justify-start items-center">
						<span className="text-white text-sm">
							Already have an account?{" "}
							<a
								href="/login"
								className="text-white font-semibold italic cursor-pointer hover:text-red-400"
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
