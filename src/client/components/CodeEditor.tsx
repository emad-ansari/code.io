import { Editor, Monaco } from "@monaco-editor/react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import OneDarkPro from "../theme/oneDarkPro.json";
import { setOpenDropDownMenu } from "../features/dropDownSlice";

export const CodeEditor = () => {
	const dispatch = useAppDispatch();

	
	const { isLanguageMenuOpen, selectedLanguage, isThemeMenuOpen } = useSelector(
		(state: RootState) => state.dropdown
	);

	const handleEditorDidMount = (monaco: Monaco) => {
		monaco.editor.defineTheme("OneDarkPro", {
			base: "vs-dark",
			inherit: true,
			...OneDarkPro,
		});
	};
  const handleOpenDropDown = () => {
    if (isLanguageMenuOpen) {
      dispatch(setOpenDropDownMenu({ menu: "languages" }));
    }
    if (isThemeMenuOpen) {
      dispatch(setOpenDropDownMenu({ menu: "theme" }));
    }
  }

	
	return (
		<div
			onClick={() => handleOpenDropDown()}
		>
			<Editor
				height="91.6vh"
				defaultLanguage="java"
				defaultValue="// some comment"
				theme="OneDarkPro"
				language={selectedLanguage}
				value={""}
				onMount={() => {}}
				options={{
					fontSize: 14,
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

				// onChange={(value) => {dispatch(setCode(value))}}
			/>
		</div>
	);
};

// fulll screen - 91.6vh
// small screen -

