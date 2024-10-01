import { ProblemDescriptionSection } from "../components/common/ProblemDescriptionSection";
import { EditorSection } from "../components/common/EditorSection";
import { ProblemNavBar } from "../components/common/ProblemNavBar";
import Split from "react-split";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const ProblemDescriptionPage = () => {
	const { isFullScreen } = useSelector((state: RootState) => state.editor);

	// get the problem detials along with  testcases with given problem title

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
