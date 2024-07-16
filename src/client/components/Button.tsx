import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge'


interface ButtonVariant {
    
    classname: string;
}

type ButtonProps = ButtonVariant & ComponentProps<"button">



export const Button = ({classname, ...props }: ButtonProps) => {
    return (
        <button {...props }className= {twMerge(classname, `rounded-lg  px-3 py-2 items-center`)} ></button>
    )
}