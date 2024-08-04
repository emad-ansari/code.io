import { StatusFilterButton } from "./StatusFilterButton";
import { DifficultyFitlerButton } from "./DifficultyFilterButton";
import { IoSearchOutline } from "react-icons/io5";
import { memo } from 'react';

export const FilterSection = memo(() => {
  
  return (
    <nav className="flex flex-row gap-10 w-full ">
      <DifficultyFitlerButton />
      <StatusFilterButton />
      <div className="relative flex flex-1 text-white shadow-inner ">
        <input
          type="text"
          className="bg-[#2B2A2B] rounded-md outline-none px-10 text-sm w-full placeholder-[#484848] focus:bg-[#403c3c] "
          placeholder="Search Questions..."
        />
        <IoSearchOutline className="absolute top-1/3 left-3" />
      </div>
    </nav>
  );
}); 

