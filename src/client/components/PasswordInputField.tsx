import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";

export const PasswordInputField = () => {
  const [showPassword, setShowPassword] = useState(false);

  const style = "absolute right-3 top-2  text-red-400 px-1 py-1 w-8 h-8 cursor-pointer rounded-full hover:bg-gray-800";

  return (
    <>
      <div className="bg-black relative rounded-lg">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Passowrd"
          className="focus:outline-none focus:ring focus:ring-offset-[#81E291] rounded-md border border-[#81E291] px-3 py-3 bg-transparent text-white relative w-full text-sm"
        />
        {showPassword ? (
          <MdVisibility 
            className={style} 
            onClick={() => setShowPassword(prevShow => !prevShow)}
          />
        ) : (
          <MdVisibilityOff 
            className={style}
            onClick={() => setShowPassword(prevShow => !prevShow)}
          />
        )}
      </div>
    </>
  );
};
