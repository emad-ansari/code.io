import { ProblemNavBar } from "../components/ProblemNavBar"
import { Button } from "../components/Button"
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import {ProblemList} from '../components/PorblemList'

export const ProblemsetPage = () => {
    return (
        <main className="bg-[#00242C] fixed top-0 bottom-0 left-0 right-0 overflow-hidden  ">
            <ProblemNavBar /> 
            <div className=" flex flex-col gap-8 h-screen overflow-scroll items-center">
                <div className = 'flex flex-col gap-8 pt-10 w-[900px]'>
                    <nav className="flex flex-row gap-10 w-full ">
                        <Button classname="flex flex-row itmes-center bg-[#5EA4A4] gap-2 " >
                            <span>Difficulty</span>
                            <MdKeyboardArrowDown className="text-2xl pt-1"/> 
                        </Button > 
                        <Button classname="flex flex-row itmes-center bg-[#5EA4A4] gap-2" >
                            <span>Status</span>
                            <MdKeyboardArrowDown className="text-2xl pt-1"/> 
                        </Button > 
                        <div className="relative flex flex-1" >
                            <input type="text" className="bg-[#5EA4A4] rounded-md outline-none px-10 text-sm w-full placeholder-[#484848] " placeholder="Search Questions..."/>
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
        </main>

    )
}