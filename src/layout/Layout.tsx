// import SideBar from "./SideBar";
// import FolderView from "./FolderView";
// import NoteView from "./NoteView";

import React from "react";
import SideBar from "../Components/SideBarComponents/SideBar.tsx";
import FolderList from "../Components/FolderList/FolderList.tsx";
import ActiveNote from "../Components/NoteComponents/ActiveNote.tsx";
import { FolderProvider } from "../context/FolderContext.tsx";
import { NoteProvider } from "../context/NoteContext.tsx";
import { Outlet } from "react-router-dom";
import EmptyNote from "../Components/NoteComponents/EmptyNote.tsx";

// const Container:React.FC=()=>{
//     return(
//         <div className="flex flex-row w-screen h-screen bg-[#222222] text-white font-sans">
//             <SideBar/>
//             <FolderView/>
//             <NoteView/>
//         </div>
//     )
// }

// export default Container

const Layout:React.FC =()=>{
    return(
        <FolderProvider>
      <NoteProvider>
        <SideBar />
        <FolderList />
        <ActiveNote/>
        {/* <Outlet /> */}
      </NoteProvider>
    </FolderProvider>
    )
}

export default Layout