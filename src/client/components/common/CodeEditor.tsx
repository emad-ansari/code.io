import { Editor, Monaco } from "@monaco-editor/react";
import { useSelector } from "react-redux";
import { LNAGUAGE_MAPPING } from "./EditorSection";
import { RootState, useAppDispatch } from "../../app/store";
import OneDarkPro from "../../theme/oneDarkPro.json";
import { useEffect } from "react";
import { getDefaultCode, setCode } from "@/client/features/editorSlice";
import { useLocation } from "react-router-dom";

export const CodeEditor = () => {
	const location = useLocation();
	const id = location.state?.id; 

	const { language, boilerPlateCode } = useSelector(
		(state: RootState) => state.editor
	);

	const { fontSize } = useSelector((state: RootState) => state.setting);

	const handleEditorDidMount = (monaco: Monaco) => {
		monaco.editor.defineTheme("OneDarkPro", {
			base: "vs-dark",
			inherit: true,
			...OneDarkPro,
		});
	};
	const dispatch = useAppDispatch();

	
	useEffect(() => {
		if (id){
			dispatch(getDefaultCode({problemId: id, languageId: LNAGUAGE_MAPPING[`${language}`].languageId}));
		}
	}, []);

	return (
		<Editor
			height="100%"
			defaultLanguage="java"
			defaultValue={boilerPlateCode}
			theme={"OneDarkPro"}
			language={language}
			value={boilerPlateCode}
			onMount={() => {}}
			options={{
				fontSize: fontSize,
				scrollBeyondLastLine: false,
				fontFamily: "Jetbrains-Mono",
				fontLigatures: true,
				wordWrap: "on",
				minimap: {
					enabled: false,
				},
				bracketPairColorization: {
					enabled: true,
				},
				cursorBlinking: "expand",
				formatOnPaste: true,
				suggest: {
					showFields: false,
					showFunctions: false,
				},
				matchBrackets: "always",
				autoIndent: "full",
			}}
			beforeMount={handleEditorDidMount}
			className="rounded-lg"
			onChange={(value) => dispatch(setCode(value!))}
		/>
	);
};

