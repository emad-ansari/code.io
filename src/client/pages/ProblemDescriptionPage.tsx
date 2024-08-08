import { ProblemDescription } from "../components/ProblemDescription"
import { EditorSection } from "../components/EditorSection"
export const ProblemDescriptionPage = () => {
    return (
        <div className = 'flex gap-2 fixed left-0 right-0 bottom-0 top-[64px] px-3 py-3 bg-black'>
            <ProblemDescription /> 
            <EditorSection />
        </div>

    )
}