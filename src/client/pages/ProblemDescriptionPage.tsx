import { useSelector } from "react-redux";
import Split from "react-split";

import { RootState } from "@/client/app/store";
import { ProblemDescriptionSection } from "@/client/components/common/ProblemDescriptionSection";
import { EditorSection } from "@/client/components/common/EditorSection";
import { ProblemNavBar } from "@/client/components/common/ProblemNavBar";

const ProblemDescriptionPage = () => {
	const { isFullScreen } = useSelector((state: RootState) => state.editor);
	
	return (
		<>
			<ProblemNavBar isProbleDescriptioPage={true} />
			<Split
				className={`flex flex-row bg-PRIMARY p-2 fixed top-0 bottom-0 left-0 right-0 transition-all duration-500 ease-in-out ${
					isFullScreen ? "z-50 " : "mt-[64px]"
				}`}
				sizes={[45, 55]}
				gutterSize={6}
				minSize={0}
				gutterAlign={"start"}
			>
				<ProblemDescriptionSection />
				<EditorSection />
			</Split>
		</>
	);
};
export default  ProblemDescriptionPage;