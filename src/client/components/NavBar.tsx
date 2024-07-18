import brandSvg from '../../assets/cover.png'
import { Link } from 'react-router-dom'


export const NavBar = () => {
    return (

        <nav className = 'flex flex-row justify-between items-center'>
            <div className='flex-none items-center justify-start'>
                <img  src= {brandSvg} alt = 'Logo' className = 'w-56 h-16' />
            </div>
            <div className = 'flex flex-1 flex-row items-center justify-center gap-14 text-white'>
                <Link to={'/'}>Home</Link>   
                <Link to={'/about-us'}>About us</Link>   
                <Link to={'/help'}>Help</Link>   
                <Link to={'/login'}>Sign In</Link>   
            </div>
        </nav>
    )
}