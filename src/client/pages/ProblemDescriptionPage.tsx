import { ProblemDescription } from "../components/ProblemDescription";
import { EditorSection } from "../components/EditorSection";
import Split from "react-split";

export const ProblemDescriptionPage = () => {
	return (
		<Split className="split " gutterSize={8}>
			<ProblemDescription />
			<EditorSection />
		</Split>
	);
};
//  className = 'flex gap-2 fixed left-0 right-0 bottom-0 top-[64px] px-3 py-3 bg-black'
