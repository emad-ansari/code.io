import { ProblemDescription } from "../components/ProblemDescription";
import { EditorSection } from "../components/EditorSection";
import { ProblemNavBar } from "../components/ProblemNavBar";
import Split from "react-split";
import { useState } from "react";

export const ProblemDescriptionPage = () => {
	const [toggleFullScreen, setToggleFullScreen] = useState<boolean>(false);

	return (
		<>
			<ProblemNavBar isProbleDescriptioPage = {true}/> 
			<Split
				className={`flex flex-row bg-PRIMARY p-2 fixed top-0 bottom-0 left-0 right-0 ${
					toggleFullScreen ? "z-50 " : "mt-[64px]"
				}`}
				gutterSize={8}
			>
				<ProblemDescription />
				<EditorSection setToggleFullScreen={setToggleFullScreen} />
			</Split>
		</>
	);
};
