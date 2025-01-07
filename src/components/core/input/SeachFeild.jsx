import React from "react";
import { IoIosSearch } from "react-icons/io";

const SeachFeild = ({ setSearchValue }) => {
  return (
    <div className="p-2 flex items-center gap-1 rounded-xl text-[#A9A9A9] bg-white h-full">
      <IoIosSearch size={24} />
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        placeholder="Search"
        className="outline-none bg-inherit w-[140px] placeholder:text-[#A9A9A9]"
      />
    </div>
  );
};

export default SeachFeild;
