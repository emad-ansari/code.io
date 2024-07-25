import { TestCase} from '../components/TestCase'
import { testcase } from '../../utils/testcase'

export const Editor = () => {
    return (
        <div className = 'flex gap-3 fixed left-0 right-0 bottom-0 top-[68px] px-3 py-3 '>
            <section  className="flex flex-1 gap-8 flex-col rounded-lg text-white bg-[#48445c] justify-start px-6 py-3 overflow-scroll scroll-smooth">
                <div className = 'flex flex-col gap-[28px] pt-5'>
                    <h1 className = 'text-3xl font-bold'> Two sum</h1>
                    <span>finding the sum of two elements</span>
                </div>
                <div className = 'flex flex-col gap-8 '>
                    {
                        testcase.map((testcase, index) => {
                            return <TestCase 
                                key = {testcase.id}
                                testCaseNumber = {index}
                                input = {testcase.input}
                                output = {testcase.output}
                            />
                        })
                    }
                </div>

            </section>
            <section className = 'flex flex-1  bg-[#48445c] rounded-lg'>
                right section
            </section>
        </div>

    )
}