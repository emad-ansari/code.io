import { ComponentProps, memo } from 'react';
import { twMerge } from 'tailwind-merge'


interface ButtonVariant {
    classname: string;
}

type ButtonProps = ButtonVariant & ComponentProps<"button">

export const Button = memo(({classname, ...props }: ButtonProps) => {
    return (
        <button {...props } className= {twMerge(classname, `  px-3 py-1.5 items-center`)} ></button>
    )
})