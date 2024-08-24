interface TestCaseProps {
    testCaseNumber: number;
    input: string,
    output: string
}

export const TestCase = ({testCaseNumber, input, output}: TestCaseProps) => {
    return (
        <div className = 'flex flex-col  gap-3 w-full'>
            <h1 className = 'text-lg font-semibold text-white'>Example {testCaseNumber + 1}</h1>
            <span className="font-[400">Input</span>
            <code className = 'rounded-md w-[80%] bg-hover text-white h-14 flex justify-start items-center px-5 font-semibold'>{input}</code>
            <span className = 'font-[400]'>Output</span>
            <code className = 'rounded-md w-[80%] bg-hover text-white h-14 flex justify-start items-center px-5 font-semibold'>{output}</code>
        </div>
    )
}