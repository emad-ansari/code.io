import { Editor } from "@monaco-editor/react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { setCode } from "../features/problemSlice";

export const CodeEditor = () => {
  const dispatch = useAppDispatch();

  const { selectedLanguage, code } = useSelector(
    (state: RootState) => state.problem
  );
  

  console.log("selected language: ", selectedLanguage);
  return (
    <Editor
      height="82vh"
      defaultLanguage="java"
      defaultValue="// some comment"
      theme="vs-dark"
      language={selectedLanguage}
      value = {code}
      onMount={() => {}}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
      }}
      onChange={(value) => {dispatch(setCode(value))}}
    />
  );
};
