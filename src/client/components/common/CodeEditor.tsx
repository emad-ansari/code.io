import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Editor, Monaco } from "@monaco-editor/react";

import { RootState, useAppDispatch } from "@/client/app/store";
import { fetchDefaultCode, setCode } from "@/client/features/codeEditorSlice";
import OneDarkPro from "@/client/theme/oneDarkPro.json";

import { LNAGUAGE_MAPPING } from "@/client/lib/types";

export const CodeEditor = () => {
	const { title } = useParams();
	const dispatch = useAppDispatch();
	const { language, code } = useSelector((state: RootState) => state.editor);

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
			dispatch(
				fetchDefaultCode({
					problemTitle: formattedTitle,
					languageId: LNAGUAGE_MAPPING["java"].languageId,
				})
			);
		}
	}, [title]);

	return (
		<Editor
			height="100%"
			defaultLanguage="java"
			defaultValue={code}
			theme={"OneDarkPro"}
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
