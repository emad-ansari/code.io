interface NavLinkStyleProps {
    isActive?: boolean
}

export const NavLinkStyle = ({isActive}: NavLinkStyleProps) => {
    return (
        <>
            <span className ={`absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-[#0FA958] group-hover:w-3/6  group-active::w-3/6 rounded-r-md ${isActive ? 'w-3/6' : 'group-hover:w-3/6'}`}></span>
            <span className ={`absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-[#0FA958] group-hover:w-3/6 rounded-l-md ${isActive ? 'w-3/6' : 'group-hover:w-3/6'}`}></span>
        </>
    )
}