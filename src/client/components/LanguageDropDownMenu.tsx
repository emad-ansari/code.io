const languages  = ["Java", "C++", 'Javascript', ]

export const LanguageDropDownMenu = () => {
  return (
    <div
      className={`flex flex-col bg-[#2B2A2B] absolute bottom-0 left-0 right-0 top-[110%] h-[125px] items-center rounded-lg py-2 z-10 shadow-md text-sm ${
        openDropDownMenu.isDifficultyMenuOpen
          ? "transform translate-y-0 opacity-100"
          : "translate-y-[-50%] opacity-0"
      } ease-in-out duration-300`}
    >
      <span className="text-[#0FA958]   font-normal hover:bg-[#403c3c] flex items-center px-2 py-2 w-[90%] rounded-md">
      </span>
      <span className="text-[#dadd32]  font-normal hover:bg-[#403c3c] flex  items-center px-2 py-2 w-[90%] rounded-md ">
        Medium
      </span>
      <span className="text-[#D91111]  font-normal hover:bg-[#403c3c] flex  items-center px-2 py-2 w-[90%] rounded-md ">
        Hard
      </span>
    </div>
  );
};
