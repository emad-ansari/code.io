import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { BsCalendarCheckFill } from "react-icons/bs";
import { BiAdjust } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
interface ProblemProps  {
    title: string;
    status: string;
    level: string
}

export const Problem = ({title, status, level}: ProblemProps) => {
    const navigate = useNavigate();

    return (
        <div 
            className = "flex flex-row bg-[#2B2A2B] h-14 rounded-md cursor-pointer"
            onClick={() => navigate (`/problems/${title}`)} 
        >
            <div className ={ `flex w-36 items-center px-3  ${status === "visited" ?  "text-[#FAFF16]" : "text-[#0FA958]"} text-2xl`}>
                {status === "completed" ? <IoCheckmarkCircleOutline /> : status === "visited" ? <BiAdjust /> :status === "daily"  ? <BsCalendarCheckFill /> : "" }
            </div>
            <div className="flex flex-1 justify-start items-center text-white">
                <span>{title}</span>
            </div>
            <div className = "flex flex-1 justify-end items-center px-12">
                <span className = {` font-medium ${ level === "Hard" ? "text-[#D91111]"  : level === "Medium" ? "text-[#FAFF16]"  : "text-[#0FA958]"} `}
                > 
                    {
                        level === "Hard" ? "Hard" : level === "Medium" ? "Medium" : "Easy"
                    }
                </span>
            </div>
        </div>
    )
}