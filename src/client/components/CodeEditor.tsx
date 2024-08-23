import { Editor, Monaco } from "@monaco-editor/react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import OneDarkPro from "../theme/oneDarkPro.json";


export const CodeEditor = () => {
	const { selectedLanguage } = useSelector(
		(state: RootState) => state.dropdown
	);
	const { fontSize } = useSelector((state: RootState) => state.setting);
	const handleEditorDidMount = (monaco: Monaco) => {
		monaco.editor.defineTheme("OneDarkPro", {
			base: "vs-dark",
			inherit: true,
			...OneDarkPro,
		});
	};

	return (
		<Editor
			height="100%"
			defaultLanguage="javascript"
			defaultValue="// some comment"
			theme="OneDarkPro"
			language={selectedLanguage}
			value={""}
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
			}}
			beforeMount={handleEditorDidMount}
			className="rounded-lg"

			// onChange={(value) => {dispatch(setCode(value))}}
		/>
	);
};


