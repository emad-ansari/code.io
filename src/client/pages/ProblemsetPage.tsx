import { Button } from "../components/Button"
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import {ProblemList} from '../components/ProblemList'
import { DifficultyDropDownMenu } from "../components/DifficultyDroptDownMenu";
import { StatusDropDownMenu } from "../components/StatusDropDownMenu";

export const ProblemsetPage = () => {


    return (
        
            <div className=" flex flex-col gap-8 h-screen overflow-scroll items-center">
                <div className = 'flex flex-col gap-8 pt-10 w-[900px]'>
                    <nav className="flex flex-row gap-10 w-full ">
                        <Button classname=" relative flex flex-row itmes-center bg-[#2B2A2B] gap-2 text-white shadow-inner hover:bg-[#403c3c]" >
                            <span>Difficulty</span>
                            <MdKeyboardArrowDown className="text-2xl pt-1"/> 
                            {<DifficultyDropDownMenu /> }
                        </Button > 
                        <Button classname="relative flex flex-row itmes-center bg-[#2B2A2B] gap-2 text-white hover:bg-[#403c3c]" >
                            <span>Status</span>
                            <MdKeyboardArrowDown className="text-2xl pt-1"/> 
                            {<StatusDropDownMenu />}
                        </Button > 
                        <div className="relative flex flex-1 text-white shadow-inner " >
                            <input type="text" className="bg-[#2B2A2B] rounded-md outline-none px-10 text-sm w-full placeholder-[#484848] focus:bg-[#403c3c] " placeholder="Search Questions..."/>
                            <IoSearchOutline className="absolute top-1/3 left-3"/>
                        </div> 
                    </nav>
                    <div className="flex items-cente ">
                        <span className="flex-none [font-family: Inter] font-mono text-white w-36 px-3 ">Status</span>
                        <span className="flex flex-1 text-white justify-start font-mono">Title</span>
                        <span className = 'flex flex-1 text-white items-center font-mono justify-end pr-5'>Difficulty</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <ProblemList /> 
                    </div>

                </div>                
            </div>


    )
}