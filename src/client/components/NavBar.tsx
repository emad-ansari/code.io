import CodeInLogo from '../../assets/websiteLogo.svg'
import { Link } from "react-router-dom";


export const NavBar = () => {
	return (
		<nav className= "flex flex-row justify-between items-center">
			<div className="flex-none items-center justify-start w-40">
				<img  src= {CodeInLogo} alt = 'Logo' className = 'w-full h-16 cursor-pointer object-cover' />
				
			</div>
			<div className="flex flex-1 flex-row items-center justify-end gap-10 text-white pr-10">
				
				<div className="text-sm font-semibold bg-[#0D1621] flex  items-center px-8 py-3 rounded-full shadow-md hover:bg-[#1e293b]">
                    <Link to = '/login'>Sign In</Link>
				</div>
			</div>
		</nav>
	);
};


{/* <div className = 'text-md m-6 group relative w-max font-dmMono '>
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
                </div> */}
				{/* <div className = 'text-sm m-6 group relative w-max font-dmMono'>
                    <NavLink to={'/about-us'}>About us</NavLink>   
                    <NavLinkStyle />
                </div> */}
				{/* <div className = 'text-sm m-6 group relative w-max font-dmMono '>
                    <NavLink to={'/help'}>Help</NavLink>   
                    <NavLinkStyle />
                </div> */}
