import { useState } from "react";
import { useSelector } from "react-redux";
import { EyeOff, Eye } from "lucide-react";

import { useAppDispatch, RootState } from "@/app/store";
import { setPassword } from "@/features/authSlice";
import { Input } from "../ui/input";


interface PasswordInputProps {
	unSetPasswordError: React.Dispatch<React.SetStateAction<string | null>>;
}
export const PasswordInputField: React.FC<PasswordInputProps> = ({
	unSetPasswordError,
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useAppDispatch();
	const { password } = useSelector((state: RootState) => state.auth);

	const style =
		"absolute right-3 top-1  text-gray-400 px-1 py-1 w-8 h-8 cursor-pointer rounded-full hover:bg-gray-600";

	return (
		<>
			<div className=" relative rounded-lg">
				<Input
					type={showPassword ? "text" : "password"}
					placeholder="Password"
					value={password}
					className="text-white rounded-lg border border-code-border  px-3 py-2.5  relative w-full  focus:ring-3 focus:ring-code-dark/50 placeholder:text-gray-400"
					onChange={(e) => {
						unSetPasswordError("");
						dispatch(setPassword(e.target.value));
					}}
				/>
				{showPassword ? (
					<Eye
						className={style}
						onClick={() => setShowPassword((prevShow) => !prevShow)}
					/>
				) : (
					<EyeOff
						className={style}
						onClick={() => setShowPassword((prevShow) => !prevShow)}
					/>
				)}
			</div>
		</>
	);
};
