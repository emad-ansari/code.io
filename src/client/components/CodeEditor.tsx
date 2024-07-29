import Editor from "@monaco-editor/react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/go/go";
import "codemirror/mode/rust/rust";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { setEditorValue } from "../features/problemSlice";

export const CodeEditor = () => {
  const dispatch = useAppDispatch();
  const { selectedLanguage, code } = useSelector(
    (state: RootState) => state.problem
  );
  const handleChange = (editor: any, data: any, value: string) => {
    console.log("value: ", value);
    console.log("editor : ", editor);
    console.log("data : ", data);
    dispatch(setEditorValue(value));
  };

  console.log("eidtor value: ", code );
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      onMount={() => {}}
    />
  );
};
