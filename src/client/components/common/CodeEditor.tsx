import { Editor, Monaco } from "@monaco-editor/react";
// import * as monaco from "monaco-editor";
import { useSelector } from "react-redux";
import { LNAGUAGE_MAPPING } from "./EditorSection";

import { RootState, useAppDispatch } from "../../app/store";
import OneDarkPro from "../../theme/oneDarkPro.json";
import { useEffect, useState } from "react";
import { getDefaultCode, setCode } from "@/client/features/editorSlice";
import { useParams } from "react-router-dom";

export const CodeEditor = () => {
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
	

	


	/*
		1. when codeEditor component load fetch all the boilerplate details along with there language
		2. Embed all details to corresponding boiler plate.
		2. make a boilerPlate state variable and setBoiler plate action function.
		3. setBoiler plate according to selectedLanguage 
	*/
	const { id } = useParams()
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
