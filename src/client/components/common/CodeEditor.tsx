import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Editor, Monaco } from "@monaco-editor/react";

import { RootState, useAppDispatch } from "@/client/app/store";
import { fetchDefaultCode, setCode } from "@/client/features/codeEditorSlice";
import { LNAGUAGE_MAPPING } from "@/client/lib/types";
import gitHubDark from "@/client/theme/gitHubDark.json";

export const CodeEditor = () => {
	const dispatch = useAppDispatch();
	const { title } = useParams();
	const { language, code } = useSelector((state: RootState) => state.editor);
	const { fontSize } = useSelector((state: RootState) => state.setting);
	
	const formattedTitle = title?.replace(/-/g, " ");

	const onEditorMount = (monaco: Monaco) => {
		monaco.editor.defineTheme("gitHubDark", {
			base: "vs-dark",
			inherit: true,
			...gitHubDark,
		});
	};
	

	useEffect(() => {
		if (formattedTitle) {
			const savedCode = localStorage.getItem(`${title}_${language}`);
			if (savedCode) {
				dispatch(setCode(savedCode));
			} else {
				dispatch(
					fetchDefaultCode({
						problemTitle: formattedTitle,
						languageId: LNAGUAGE_MAPPING[`${language}`].languageId,
					})
				);
			}
		}
	}, [title]);

	const onCodeChange = (value: string | undefined) => {
		localStorage.setItem(`${title}_${language}`,  value!);
		dispatch(setCode(value!));
	}

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
			onChange={(value) =>  onCodeChange(value)}

		/>
	);
};
