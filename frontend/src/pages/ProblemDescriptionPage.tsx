import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Split from "react-split";

import { RootState } from "@/app/store";
import { ProblemDescriptionSection } from "@/components/common/ProblemDescriptionSection";
import { EditorSection } from "@/components/common/EditorSection";


const ProblemDescriptionPage = () => {
	const {isFullScreen } = useSelector((state: RootState) => state.editor);

	return (
		<div className={` px-2 pb-2 bg-code-bg h-screen  transition-all duration-500 ease-in-out ${isFullScreen ? 'pt-0 z-50' : 'pt-16'}`}>

			<ToastContainer />
			<Split
				className={`flex flex-row pt-2 h-full`}
				sizes={[45, 55]}
				gutterSize={6}
				minSize={0}
				gutterAlign={"start"}
			>
				<ProblemDescriptionSection />
				<EditorSection />
			</Split>
		</div>
	);
};
export default ProblemDescriptionPage;
