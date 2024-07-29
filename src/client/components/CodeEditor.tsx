import { Editor } from "@monaco-editor/react";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { setCode } from "../features/problemSlice";

export const CodeEditor = () => {
  const dispatch = useAppDispatch();

  const { selectedLanguage, code } = useSelector(
    (state: RootState) => state.problem
  );
  

  console.log("eidtor value: ", code );
  return (
    <Editor
      height="82vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      theme="vs-dark"   
      language=""
      onMount={() => {}}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
      }}
    />
  );
};
