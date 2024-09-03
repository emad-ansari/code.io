import { Editor, Monaco } from "@monaco-editor/react";
// import * as monaco from "monaco-editor";
import { useSelector } from "react-redux";
import { setBoilerPlateCode } from "../features/editorSlice";
import { RootState, useAppDispatch } from "../app/store";
import OneDarkPro from "../theme/oneDarkPro.json";
import { useEffect, useState } from "react";


export const CodeEditor = () => {
	const { language, boilerPlateCode } = useSelector(
		(state: RootState) => state.editor
	);
	const { fontSize } = useSelector(
		(state: RootState) => state.setting
	);

	const handleEditorDidMount = (monaco: Monaco) => {
		monaco.editor.defineTheme("OneDarkPro", {
			base: "vs-dark",
			inherit: true,
			...OneDarkPro,
		});
	};
	const dispatch = useAppDispatch();
	const [code, setCode] = useState<string>('');
	console.log('this is code: ', code);
	/*
		1. when codeEditor component load fetch all the boilerplate details along with there language
		2. Embed all details to corresponding boiler plate.
		2. make a boilerPlate state variable and setBoiler plate action function.
		3. setBoiler plate according to selectedLanguage 
	*/
	
	useEffect(() => {
		dispatch(setBoilerPlateCode(language));
	}, [language])

	return (
		<Editor
			height="100%"
			// defaultLanguage="javascript"
			// defaultValue={boilerPlateCode}
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
			onChange={(value) => setCode(value!)}
		/>
	);
};



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