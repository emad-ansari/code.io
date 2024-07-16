interface InputPorps {
    inputRef: React.RefObject<HTMLInputElement>;
    value: string
}

export const Input = ({inputRef, value}: InputPorps) => {

    return (
        <input 
            ref = {inputRef}
            type="text" 
            value = {value}
            min = {0}
            max = {9}
            className="w-[54px] h-14  bg-[#d9d9d9] rounded-[10px] text-center font-bold"
        />
    )
}