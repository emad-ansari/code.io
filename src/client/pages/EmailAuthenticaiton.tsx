import { Button } from "../components/Button";
import { useState, useRef, useEffect } from "react";

interface FocusIndexAndDigit {
  focusIndex: number
  firstDigi: number;
  secondDigi: number;
  thirdDigi: number;
  fourthDigi: number;
}


export const EmailAuthenticaiton = () => {
  const ref0 = useRef<HTMLInputElement>(null);
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);

  const [focusedIndexAndDigit, setFocusedIndexAndDigit] = useState<FocusIndexAndDigit | undefined>(undefined);

  const setIndexAndDigit = (focusIndex: number, value: number, name: string) => {
    setFocusedIndexAndDigit(prevState => {
        return {
            ...prevState,
            focusIndex: focusIndex,
            [name]: value
        } as FocusIndexAndDigit
    })
  }
  

  const storeDigit = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let valueToken = Number(e.target.value);
    console.log(typeof valueToken);
    if (valueToken > 10){
        valueToken = valueToken % 10;
    }
    switch(index) {
        case 1: 
            setIndexAndDigit(2, valueToken, "firstDigi");
            break;
        case 2: 
            setIndexAndDigit(3, valueToken, "secondDigi");
            break;

        case 3: 
            setIndexAndDigit(4, valueToken, "thirdDigi");
            break;

        case 4: 
            setIndexAndDigit(1, valueToken, "fourthDigi");
            break;
        
    }
  };

  const foucsNextInputBox = () => {

    if(focusedIndexAndDigit && focusedIndexAndDigit.focusIndex)
        {
            console.log(focusedIndexAndDigit.focusIndex)
            switch(focusedIndexAndDigit.focusIndex)
            {
               case 1:
                ref0.current?.focus()
                break;
               case 2:
                ref1.current?.focus()
                break;
               case 3:
                ref2.current?.focus()
                break;
               case 4:
                ref3.current?.focus()
                break;    
            }
        }

  }

  useEffect(() => {
    foucsNextInputBox();
  }, [focusedIndexAndDigit?.focusIndex])

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
            <input
              type="number"
              value={focusedIndexAndDigit && focusedIndexAndDigit.firstDigi}
              ref={ref0}
              onChange={(e) => storeDigit(e, 1)}
              maxLength={1}
              className="w-[54px] h-14  bg-[#d9d9d9] rounded-[10px] text-center font-bold no-spin"
            />
            <input
              type="number"
              value={focusedIndexAndDigit && focusedIndexAndDigit.secondDigi}
              ref={ref1}
              onChange={(e) => storeDigit(e, 2)}
              maxLength={1}
              className="w-[54px] h-14  bg-[#d9d9d9] rounded-[10px] text-center font-bold no-spin"
            />

            <input
              type="number"
              value={focusedIndexAndDigit && focusedIndexAndDigit.thirdDigi}
              ref={ref2}
              onChange={(e) => storeDigit(e, 3)}
              className="w-[54px] h-14  bg-[#d9d9d9] rounded-[10px] text-center font-bold no-spin"
            />
            <input
              type="number"
              value={focusedIndexAndDigit && focusedIndexAndDigit.fourthDigi}
              ref={ref3}
              onChange={(e) => storeDigit(e, 4)}
              maxLength={1}
              className="w-[54px] h-14  bg-[#d9d9d9] rounded-[10px] text-center font-bold no-spin"
            />
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
