

export const DifficultyDropDownMenu = () => {
  return (
    <div className=" bg-[#2B2A2B] flex flex-col  absolute bottom-0 left-0 right-0 top-[110%] h-[125px] items-center rounded-lg py-2 z-50 shadow-md text-sm" >
      <span className="text-[#0FA958]   font-normal hover:bg-[#403c3c] flex items-center px-2 py-2 w-[90%] rounded-md">Easy</span>
      <span className="text-[#dadd32]  font-normal hover:bg-[#403c3c] flex  items-center px-2 py-2 w-[90%] rounded-md ">Medium</span>
      <span className="text-[#D91111]  font-normal hover:bg-[#403c3c] flex  items-center px-2 py-2 w-[90%] rounded-md ">Hard</span>
    </div>
  );
};
//
 