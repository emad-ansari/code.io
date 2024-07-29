import { Button } from "../components/Button";
import { MdKeyboardArrowDown, MdOutlineFileUpload } from "react-icons/md";
// import { MdOutlineFileUpload } from "react-icons/md";

export const EditorSection = () => {
  return (
    <section className="flex flex-1  bg-[#48445c] rounded-lg flex-col gap-1">
      <div className="flex items-center px-2 py-1 bg-slate-300 rounded-tl-md rounded-tr-md justify-between  gap-5">
        <Button classname="flex flex-row items-center gap-2 bg-[#48445c] text-white">
          <span>Languages</span>
          <MdKeyboardArrowDown className = '' /> 
        </Button>
        <div className="flex flex-row gap-4 items-center">
          <Button classname="bg-[#48445c] text-white flex gap-2 items-center">
            <span>Submit</span>
            <MdOutlineFileUpload />
          </Button>

          <Button classname="bg-[#48445c] text-white">
            <span>Submissons</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
