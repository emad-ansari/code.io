import { Button } from "../components/Button";
import { useRef } from "react";

export const EmailAuthenticaiton = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="bg-[#141515] flex fixed top-0 bottom-0 left-0 right-0">
      <div className="flex flex-col relative w-[500px] h-[400px] top-[164px] left-[486px] bg-[#00242c] rounded-[29px] items-center pt-10">
        <div className="flex flex-col items-center gap-8">
          <div className="h-[38px]  [font-family:'Inria_Sans-Bold',Helvetica] font-bold text-[#81e291] text-[25px] text-center tracking-[3.20px] leading-[normal] whitespace-nowrap">
            Email Authentication
          </div>
          <div className=" [font-family:'Inter-Regular',Helvetica] font-normal text-white text-xl tracking-[2.40px] leading-[normal]">
            Enter OTP code
          </div>

          <div className="flex flex-row gap-5">
          {[0, 1, 2, 3].map((_, index) => (
              <input
                key={index}
                type="number"
                min = {0}
                max = {9}
                ref={(el) => {
                  inputRefs.current[index] = el
                }} 
                onChange={(e) => handleInput(e, index)}
                className="w-[54px] h-14  bg-[#d9d9d9] rounded-[10px] text-center font-bold no-spin"    
              />
            ))}
          </div>
          <Button classname="bg-[#81e291] rounded-[10px] text-black [font-family:'Inter-Regular',Helvetica] h-14 w-72 hover:bg-[#9beca8]">
            Verify OTP
          </Button>
          <a className=" [font-family:'Inter-Regular',Helvetica] font-normal text-white  hover:text-red-400 text-[15px] text-center tracking-[1.50px] leading-[normal] whitespace-nowrap cursor-pointer">
            Resend OTP
          </a>
        </div>
      </div>
    </div>
  );
};
