import { Button } from "../components/Button";

export const EmailAuthenticaiton = () => {
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
              <div className=" w-[54px] h-14  bg-[#d9d9d9] rounded-[10px]" />
              <div className="w-[54px] h-14  bg-[#d9d9d9] rounded-[10px]" />
              <div className="w-[54px] h-14  bg-[#d9d9d9] rounded-[10px]" />
              <div className="w-[54px] bg-[#d9d9d9] rounded-[10px]" />
            </div>
            <Button classname="bg-[#81e291] rounded-[10px] text-black [font-family:'Inter-Regular',Helvetica] h-14 w-72">
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

// absolute h-6 top-4 left-[93px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap