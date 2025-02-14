import React, { useState } from "react";
import Recents from "./Recents.tsx";

function SideBar() {
  const [search, setSearch] = useState(true);

  const handleSearch = () => {
    setSearch((s) => !s);
  };

  return (
    <>
      <div className="side-bar flex flex-col w-[300px] h-screen bg-[#181818] pt-[30px] pb-[30px] pr-[20px] pl-[20px] gap-[30px]">
        <div className="logo-search flex justify-between items-center h-[38px] w-full">
          <img
            src="../src/assets/logo.svg"
            alt="logo"
            className="h-full w-[101px]"
          />
          <img
            src="../src/assets/search.svg"
            alt="search"
            onClick={handleSearch}
            className="w-[13.33px] h-[13.33px] cursor-pointer"
          />
        </div>

        {search ? (
          <div className="new-note-field flex justify-center items-center w-full h-[40px] pl-[20px] gap-[8px] rounded-[3px] bg-white/5 pr-[20px]">
            <img
              src="../src/assets/new.svg"
              alt="Add file img"
              className="w-[20px] h-[20px]"
            />
            <span className="text-white font-[Source Sans Pro] font-semibold text-base leading-[20.11px] tracking-normal">
              New Note
            </span>
          </div>
        ) : (
          <div className="search-field flex items-center w-full h-[40px] gap-[8px] rounded-[3px] bg-white/5 pl-[10px]">
            <img
              src="../src/assets/search.svg"
              alt="Add file img"
              className="w-[20px] h-[20px]"
            />
            <span className="text-white font-[Source Sans Pro] font-semibold text-base leading-[20.11px] tracking-normal">
              Search Note
            </span>
          </div>
        )}

        <Recents />
      </div>
    </>
  );
}

export default SideBar;
