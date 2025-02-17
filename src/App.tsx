import SideBar from "./Components/SideBarComponents/SideBar.tsx";
import FolderList from "./Components/FolderList/FolderList.tsx";
import ActiveNote from "./Components/NoteComponents/ActiveNote.tsx";
import { FolderProvider } from "./context/FolderContext.tsx";
import { NoteProvider } from "./context/NoteContext.tsx";
import { Outlet } from "react-router-dom";
import EmptyNote from "./Components/NoteComponents/EmptyNote.tsx";
import { BrowserRouter as Router, createRoutesFromElements, Route,  RouterProvider, Routes } from 'react-router-dom'
import Layout from "./layout/Layout.tsx";

function App() {
  return (
    // <FolderProvider>
    //   <NoteProvider>
    //     <SideBar />
    //     <FolderList />
    //     <EmptyNote/>
    //     {/* <Outlet /> */}
    //   </NoteProvider>
    // </FolderProvider>

    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}/>
        <Route path=':folders/:folderId' element={<Layout/>}/>
      </Routes>
    </Router>
  );
}

export default App;
