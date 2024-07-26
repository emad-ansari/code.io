import { IoIosCheckmark } from "react-icons/io";
import { BiAdjust } from "react-icons/bi";
import { FaMinus } from "react-icons/fa6";

export const StatusDropDownMenu = () => {
    return (
        <div className=" bg-[#2B2A2B] flex flex-col  absolute bottom-0 left-0 right-[-25px] top-[110%] h-[125px] items-center rounded-lg py-2 z-50 shadow-lg">
            <div className="text-white font-normal hover:bg-[#403c3c] flex gap-3 items-center px-2 py-2 w-[90%] rounded-md text-md">
                <FaMinus className="text-xs text-white" /> 
                <span className = 'text-sm'>Todo</span>
            </div>
            <div className="text-white font-normal hover:bg-[#403c3c] flex gap-1 items-center px-1 py-2 w-[90%] rounded-md text-md">
                <IoIosCheckmark className="text-[#2baa66] text-2xl " /> 
                <span className = 'text-sm'>Solved</span>
            </div>
            <div className="text-white font-normal hover:bg-[#403c3c] flex gap-2  items-center px-2 py-2 w-[90%] rounded-md text-md">
                <BiAdjust className = 'text-lg text-[#FAFF16]' /> 
                <span className = 'text-sm'>Attempted</span>
            </div>
      </div>
    )

}