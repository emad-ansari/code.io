import { Editor, Monaco } from "@monaco-editor/react";
import { useSelector } from "react-redux";
import { LNAGUAGE_MAPPING } from "./EditorSection";
import { RootState, useAppDispatch } from "../../app/store";
import OneDarkPro from "../../theme/oneDarkPro.json";
import { useEffect } from "react";
import { fetchDefaultCode, setCode } from "@/client/features/editorSlice";
import { useParams } from "react-router-dom";

export const CodeEditor = () => {
	const { title } = useParams();
	const dispatch = useAppDispatch();
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
	
	
	useEffect(() => {
		if (title) {
			const formattedTitle = title.replace(/-/g, " ");
			console.log('current selected language: ', language);
			dispatch(
				fetchDefaultCode({
					problemTitle: formattedTitle,
					languageId: LNAGUAGE_MAPPING["java"].languageId,
				})
			);
		}
	}, [title]);
	console.log('current langauge: ',language)
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
