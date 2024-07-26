import brandSvg from '../../assets/cover.png'
import { NavLink } from 'react-router-dom'
import { NavLinkStyle } from './NavLinkStyle'


export const NavBar = () => {
    return (

        <nav className = 'flex flex-row justify-between items-center'>
            <div className='flex-none items-center justify-start w-40'>
                <img  src= {brandSvg} alt = 'Logo' className = 'w-full h-16 cursor-pointer' />
            </div>
            <div className = 'flex flex-1 flex-row items-center justify-center gap-10 text-white'>
                <div className = 'text-md m-6 group relative w-max font-dmMono '>
                    <NavLink to={'/'}>
                        {
                         ({isActive}) => (
                            <>
                            <span>Home</span>
                            <NavLinkStyle  isActive = {isActive}/>        
                            </>
                         )
                        }
                    </NavLink>   
                    <NavLinkStyle />
                </div>
                <div className = 'text-sm m-6 group relative w-max font-dmMono'>
                    <NavLink to={'/about-us'}>About us</NavLink>   
                    <NavLinkStyle />
                </div>
                <div className = 'text-sm m-6 group relative w-max font-dmMono '>
                    <NavLink to={'/help'}>Help</NavLink>   
                    <NavLinkStyle />
                </div>
                <div className = 'text-sm m-6 group relative w-max font-dmMono ' >
                    <NavLink to={'/login'}>Sign In</NavLink>   
                    <NavLinkStyle />
                </div>

            </div>
        </nav>
    )
}