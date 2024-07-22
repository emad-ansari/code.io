import { TestCase} from '../components/TestCase'

export const Editor = () => {
    return (
        <div className = 'flex gap-3 fixed left-0 right-0 bottom-0 top-[68px] px-3 py-3 '>
            <section  className="flex flex-1 gap-8 flex-col rounded-lg text-white bg-[#484848] justify-start px-6">
                <div className = 'flex flex-col gap-[36px] pt-5'>
                    <h1 className = 'text-3xl'> Two sum</h1>
                    <span>finding the sum of two elements</span>
                </div>
                <div className = 'flex '>
                    <TestCase/>
                    
                </div>
                

            </section>
            <section className = 'flex flex-1  bg-[#484848] rounded-lg'>
                right section
            </section>
        </div>

    )
}