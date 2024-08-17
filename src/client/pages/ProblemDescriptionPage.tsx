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

