import React from "react";
import SideBar from "../Components/SideBarComponents/SideBar.tsx";
import FolderList from "../Components/FolderList/FolderList.tsx";
import { FolderProvider } from "../context/FolderContext.tsx";
import { NoteProvider } from "../context/NoteContext.tsx";
import NoteView from "../Components/NoteComponents/NoteView.tsx";

const Layout: React.FC = () => {
  return (
    <FolderProvider>
      <NoteProvider>
        <SideBar />
        <FolderList />
        <NoteView />
      </NoteProvider>
    </FolderProvider>
  );
};

export default Layout;
