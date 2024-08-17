import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { BsCalendarCheckFill } from "react-icons/bs";
import { BiAdjust } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface ProblemProps  {
    title: string;
    status: string;
    level: string,
    problemNo: number

}

export const Problem = ({title, status, level, problemNo}: ProblemProps) => {
    const navigate = useNavigate();

    return (
        <div 
            className = "flex flex-row bg-darkGray h-14 rounded-md cursor-pointer"
            onClick={() => navigate (`../../problem/${title}`)} 
        >
            <div className ={ `flex w-36 items-center px-3  ${status === "visited" ?  "text-[#f5f78e]" : "text-[#0FA958]"} text-2xl`}>
                {status === "completed" ? <IoCheckmarkCircleOutline /> : status === "visited" ? <BiAdjust /> :status === "daily"  ? <BsCalendarCheckFill /> : "" }
            </div>
            <div className="flex flex-1 justify-start items-center text-white gap-2">
                <span>{problemNo}.</span>
                <span>{title}</span>
            </div>
            <div className = " w-[110px] text-center pt-4">
                <span className = {`flex items-center font-normal ${ level === "Hard" ? "text-RED"  : level === "Medium" ? "text-YELLOW"  : "text-GREEN"} `}
                > 
                    {
                        level === "Hard" ? "Hard" : level === "Medium" ? "Medium" : "Easy"
                    }
                </span>
            </div>
        </div>
    )
}