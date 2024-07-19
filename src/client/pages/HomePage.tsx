import { Button } from "../components/Button"
import { NavBar } from "../components/NavBar"

export const HomePage = () => {
    return (
        <main className = 'bg-[#00242C] fixed top-0 bottom-0 left-0 right-0'>
            <NavBar />
            <div className = 'grid grid-cols-2 fixed bottom-0 left-0 right-0 top-16'>
                <div className = 'pt-20 flex flex-col items-center gap-10'>
                    <p className =  " w-[710px] [font-family:'Fugaz_One-Regular',Helvetica]  text-white text-[40px] text-center tracking-[2.00px] font-semibold leading-[normal]">Master Coding Challenges and Enhance Problem-Solving Skills with Code.In</p>
                    <Button classname="w-[70%] h-12 bg-[#0FA958] text-black font-semibold">Create an account</Button>
                </div>
                <div className = 'bg-yellow-500 '>right section</div>
            </div>
            
        </main>
    )
}