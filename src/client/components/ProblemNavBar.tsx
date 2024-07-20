import brandSvg from '../../assets/cover.png'
import { Link } from "react-router-dom"
import { NavLinkStyle } from "./NavLinkStyle"


export const ProblemNavBar = () => {
    return (
        <nav className = 'flex flex-row justify-between items-center'>
            <div className='flex-none items-center justify-start'>
                <img  src= {brandSvg} alt = 'Logo' className = 'w-56 h-16' />
            </div>
            <div className = 'flex flex-1 flex-row items-center justify-center gap-10 text-white'>
                <div className = 'text-sm m-6 group relative w-max'>
                    <Link to={'/problemset'}>Problems</Link>   
                    <NavLinkStyle />
                </div>
                <div className = 'text-sm m-6 group relative w-max'>
                    <Link to={'/contests'}>Contests</Link>   
                    <NavLinkStyle />
                </div>
                <div className = 'text-sm m-6 group relative w-max'>
                    <Link to={'/standings'}>Standings</Link>   
                    <NavLinkStyle />
                </div>
            </div>
        </nav>
        

    )
}