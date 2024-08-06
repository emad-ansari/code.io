import { Editor } from "@monaco-editor/react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";


export const CodeEditor = () => {
  const dispatch = useAppDispatch();

  const { selectedLanguage } = useSelector(
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
      value = {""}
      onMount={() => {}}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
      }}
      // onChange={(value) => {dispatch(setCode(value))}}
    />
  );
};
