import brandSvg from "../../assets/cover.png";
import { NavLink } from "react-router-dom";
import { NavLinkStyle } from "./NavLinkStyle";


export const ProblemNavBar = () => {
  
  return (
    <nav className="flex flex-row justify-between items-center">
      <div className="flex-none items-center justify-start w-96">
        <img src={brandSvg} alt="Logo" className="w-40 h-16" />
      </div>
      <div className="flex flex-1 flex-row items-center justify-start gap-10 text-white">
        <div className="text-sm m-6 group relative w-max font-dmMono">
          <NavLink to={"/problemset"}>
          
            {({ isActive }) => (
              <>
                <NavLinkStyle isActive={isActive} />
                <span>Problems</span>
              </>
            )}
          </NavLink>
          <NavLinkStyle  isActive={false}/>
        </div>
        <div className="text-sm m-6 group relative w-max font-dmMono">
          <NavLink to={"/contests"}>Contests</NavLink>
          <NavLinkStyle  isActive={false}/>
        </div>
        <div className="text-sm m-6 group relative w-max font-dmMono">
          <NavLink to={"/standings"}>Standings</NavLink>
          <NavLinkStyle  isActive={false}/>
        </div>
      </div>
    </nav>
  );
};
