import { Controlled as ControlledEditorComponent } from "react-codemirror2";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import { useSelector } from "react-redux";
import { RootState } from "../app/store";


export const CodeEditor = () => {
    const { selectedLanguage } = useSelector((state: RootState) => state.problem);

  return (
    <ControlledEditorComponent
      onBeforeChange={(value) => {
        console.log('value is: ', value)
      }}
    //   value={value}
      className="code-mirror-wrapper"
      options={{
        lineWrapping: true,
        lint: true,
        mode: selectedLanguage,
        lineNumbers: true,
        theme: "dracula",
      }}
    />
  );
};
