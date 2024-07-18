import brandSvg from '../../assets/cover.png'
import { Link } from 'react-router-dom'
import { NavLinkStyle } from './NavLinkStyle'


export const NavBar = () => {
    return (

        <nav className = 'flex flex-row justify-between items-center'>
            <div className='flex-none items-center justify-start'>
                <img  src= {brandSvg} alt = 'Logo' className = 'w-56 h-16' />
            </div>
            <div className = 'flex flex-1 flex-row items-center justify-center gap-14 text-white'>
                <div className = 'text-lg m-6 group relative w-max'>
                    <Link to={'/'}>Home</Link>   
                    <NavLinkStyle />
                </div>
                <div className = 'text-lg m-6 group relative w-max'>
                    <Link to={'/about-us'}>About us</Link>   
                    <NavLinkStyle />
                </div>
                <div className = 'text-lg m-6 group relative w-max'>
                    <Link to={'/help'}>Help</Link>   
                    <NavLinkStyle />
                </div>
                <div className = 'text-lg m-6 group relative w-max' >
                    <Link to={'/login'}>Sign In</Link>   
                    <NavLinkStyle />
                </div>

            </div>
        </nav>
    )
}