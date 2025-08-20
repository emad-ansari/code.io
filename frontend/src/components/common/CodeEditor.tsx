import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Editor, Monaco } from "@monaco-editor/react";

import { RootState, useAppDispatch } from "@/app/store";
import { fetchDefaultCode, setCode } from "@/features/codeEditorSlice";
import gitHubDark from "@/theme/gitHubDark.json";

export const CodeEditor = () => {
	const dispatch = useAppDispatch();
	const { problemId } = useParams();
	const { language, code } = useSelector((state: RootState) => state.editor);
	const { fontSize } = useSelector((state: RootState) => state.setting);

	console.log('this is code: ', code)
	const onEditorMount = (monaco: Monaco) => {
		monaco.editor.defineTheme("gitHubDark", {
			base: "vs-dark",
			inherit: true,
			...gitHubDark,
		});
	};

	const onCodeChange = (value: string | undefined) => {
		localStorage.setItem(`${problemId}_${language}`, value!);
		dispatch(setCode(value!));
	};

	useEffect(() => {
		if (problemId) {
			const savedCode = localStorage.getItem(`${problemId}_${language}`);
			if (savedCode) {
				dispatch(setCode(savedCode));
			} else {
				dispatch(
					fetchDefaultCode({
						language: language,
						problemId,
					})
				);
			}
		}
	}, [language]);

	return (
		<Editor
			height="100%"
			defaultLanguage="java"
			defaultValue={code}
			theme={"gitHubDark"}
			language={language}
			value={code}
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
				formatOnPaste: true,
				suggest: {
					showFields: false,
					showFunctions: false,
				},
				matchBrackets: "always",
				autoIndent: "full",
			}}
			beforeMount={onEditorMount}
			className="rounded-lg"
			onChange={(value) => onCodeChange(value)}
		/>
	);
};
