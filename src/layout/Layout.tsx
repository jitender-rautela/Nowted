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