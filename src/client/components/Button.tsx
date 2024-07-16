import { twMerge } from 'tailwind-merge'

interface ButtonProps {
    name: string
    classname: string;
}


export const Button = ({name, classname }: ButtonProps) => {
    return (
        <div className="relative">
            <button className= {twMerge(classname, `rounded-lg  px-3 py-2 items-center`)} >{name}</button>
        </div>
    )
}