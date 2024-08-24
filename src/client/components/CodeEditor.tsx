import { Editor, Monaco } from "@monaco-editor/react";
// import * as monaco from "monaco-editor";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
// import { useEffect } from "react";
import OneDarkPro from "../theme/oneDarkPro.json";
// import GitHubDark from "../theme/gitHubDark.json";
// import VsLight from "../theme/vsLight.json";

export const CodeEditor = () => {
	const { selectedLanguage } = useSelector(
		(state: RootState) => state.dropdown
	);
	const { fontSize } = useSelector(
		(state: RootState) => state.setting
	);
	// console.log("current theme: ", theme);

	// useEffect(() => {
	// 	if (!monaco) return;
	// 	monaco.editor.defineTheme("OneDarkPro", {
	// 		base: "vs-dark",
	// 		inherit: true,
	// 		...OneDarkPro,
	// 	});
	// 	monaco.editor.defineTheme("GitHub-Dark", {
	// 		base: "vs-dark",
	// 		inherit: true,
	// 		...GitHubDark,
	// 	});
	// 	monaco.editor.defineTheme("Vs-Light", {
	// 		base: "vs",
	// 		inherit: true,
	// 		...VsLight,
	// 	});
	// 	// monaco.editor.setTheme(theme);

	// 	console.log("here...");
	// }, [theme]);

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
			theme={"OneDarkPro"}
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
				matchBrackets: "always",
				autoIndent: "full",
			}}
			beforeMount={handleEditorDidMount}
			className="rounded-lg"
			// onChange={(value) => {dispatch(setCode(value))}}
		/>
	);
};
