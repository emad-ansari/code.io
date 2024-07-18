import { NavBar } from "../components/NavBar"

export const HomePage = () => {
    return (
        <main className = 'bg-[#00242C] fixed top-0 bottom-0 left-0 right-0'>
            <NavBar />
            <div className = 'grid grid-cols-2'>
                <div className = 'bg-red-400'>left section</div>
                <div className = 'bg-yellow-500 '>right section</div>
            </div>
            
        </main>
    )
}