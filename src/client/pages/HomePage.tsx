import { Button } from "../components/Button"
import { NavBar } from "../components/NavBar"
import { useNavigate } from "react-router-dom"
import NQueen from '../../assets/NQueen.png'

export const HomePage = () => {
    const navigate = useNavigate();




    return (
        <main className = 'bg-[#00242C] fixed top-0 bottom-0 left-0 right-0'>
            <NavBar />
            <div className = 'grid grid-cols-2 fixed bottom-0 left-0 right-0 top-16'>
                <div className = 'pt-20 flex flex-col items-center gap-20'>
                    <p className =  " w-[710px] font-fugaz  text-[#0FA958] text-[38px] text-center tracking-[3.20px] leading-[normal]">Master Coding Challenges and Enhance Problem-Solving Skills with Code.In</p>
                    <Button 
                        classname="w-[60%] h-12 text-white bg-[#48445c] font-semibold  hover:bg-[#4f4c63]"
                        onClick = {() => navigate('/signup')}
                    >
                        Create an account
                    </Button>
                </div>
                <div className = ''>
                    <img src= {NQueen} alt="" className = 'w-[95%] h-[90%] cursor-pointer'/>
                </div>
            </div>
            
        </main>
    )
}