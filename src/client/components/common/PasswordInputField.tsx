import { useState } from "react";
import { useSelector } from "react-redux";
import { EyeOff, Eye } from 'lucide-react'

import { useAppDispatch, RootState } from "@/client/app/store";
import { setPassword } from "@/client/features/authSlice";

export const PasswordInputField = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { password } = useSelector((state: RootState) => state.user);

  const style = "absolute right-3 top-1  text-gray-400 px-1 py-1 w-8 h-8 cursor-pointer rounded-full hover:bg-gray-600";

  return (
    <>
      <div className=" relative rounded-lg">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Passowrd"
          value = {password}
          className="outline-none  rounded-lg border border-code-border  px-3 py-2.5 bg-transparent text-white relative w-full text-sm"
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        {showPassword ? (
          <Eye 
            className={style} 
            onClick={() => setShowPassword(prevShow => !prevShow)}
          />
        ) : (
          <EyeOff 
            className={style}
            onClick={() => setShowPassword(prevShow => !prevShow)}
          />
        )}
      </div>
    </>
  );
};
