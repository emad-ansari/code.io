interface TestCaseProps {
    testCaseNumber: number;
    input: string,
    output: string
}

export const TestCase = ({testCaseNumber, input, output}: TestCaseProps) => {
    return (
        <div className = 'flex flex-col  gap-3 w-full'>
            <h1 className = 'text-xl font-semibold text-white'>Test Case {testCaseNumber + 1}</h1>
            <span className="font-medium">Input</span>
            <span className = 'rounded-md w-[80%] bg-white text-black h-14 flex justify-start items-center px-5 font-semibold'>{input}</span>
            <span className = 'font-medium'>Output</span>
            <span className = 'rounded-md w-[80%] bg-white text-black h-14 flex justify-start items-center px-5 font-semibold'>{output}</span>
        </div>
    )
}