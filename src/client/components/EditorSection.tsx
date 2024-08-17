import { Button } from "../components/Button";
import { MdOutlineFileUpload } from "react-icons/md";
import { ModeSelectButton } from "./ModeSelectButton";
import { CodeEditor } from "./CodeEditor";
import { IoSettings } from "react-icons/io5";
import { GoScreenFull } from "react-icons/go";

export const EditorSection = () => {
  return (
    <section className="flex flex-1  bg-darkGray  rounded-lg flex-col   border border-gray-500">
      <div className="flex items-center px-2 py-1 bg-[#1f2937] rounded-tl-lg rounded-tr-lg justify-between  gap-5">
        <ModeSelectButton />
        <div className="flex flex-row gap-2 items-center ">
          <Button classname="bg-darkGray text-white flex gap-2 items-center rounded-md">
            <span>Submit</span>
            <MdOutlineFileUpload />
          </Button>
          <Button classname={" hover:bg-gray-700 rounded-full "}>
            <IoSettings className="text-white"/> 
          </Button>
          <Button classname={"hover:bg-gray-700 rounded-full"}>
          < GoScreenFull className="text-white"/> 
          </Button>
        </div>
      </div>
      <div className = 'bg-[#48445c]  border border-gray-500'>
        <CodeEditor />         
      </div>
    </section>
  );
};
