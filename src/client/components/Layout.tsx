import { Outlet } from "react-router-dom"
import { ProblemNavBar } from "./ProblemNavBar"

export const Layout = () => {
    return (
        <>
            <ProblemNavBar /> 
            <Outlet /> 
        </>

    )
}