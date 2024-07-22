import { Outlet } from "react-router-dom"
import { ProblemNavBar } from "./ProblemNavBar"

export const ProblemLayout = () => {
    return (
        <main className="bg-[#00242C] fixed top-0 bottom-0 left-0 right-0 overflow-hidden ">
            <ProblemNavBar />
            <Outlet /> 
        </main>

    )
}