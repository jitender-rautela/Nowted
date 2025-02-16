import { useState } from "react";
import Recents from "./Recents.tsx";
import Folders from "./Folders.tsx";
import More from "./More.tsx";

function SideBar() {
  const [search, setSearch] = useState(true);

  const handleSearch = () => {
    setSearch((s) => !s);
  };

  return (
    <>
      <div className="side-bar flex flex-col w-[300px] h-[1024px] bg-[#181818] pt-[30px] pb-[30px] pr-[20px] pl-[20px] gap-[30px]">
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
          <div
          className="new-note-field flex justify-center items-center w-full h-[40px] pl-5 pr-5 gap-2 rounded bg-white/5 cursor-pointer hover:bg-white/10 transition"
          onClick={() => console.log("Create a new note!")} 
        >
          <img src="../src/assets/new.svg" alt="New Note" className="w-5 h-5" />
          <span className="text-white font-semibold text-base">New Note</span>
        </div>
        
        ) : (
          <div className="search-field flex items-center w-full h-[40px] gap-2 rounded bg-white/5 pl-3">
            <img
              src="../src/assets/search.svg"
              alt="Search icon"
              className="w-5 h-5"
            />
            <input
              type="text"
              placeholder="Search Note"
              className="bg-transparent text-white font-semibold text-base outline-none placeholder-white w-full"
            />
          </div>
        )}

        <Recents />
        <Folders />
        <More />
      </div>
    </>
  );
}

export default SideBar;
