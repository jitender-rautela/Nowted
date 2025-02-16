import SideBar from "./Components/SideBarComponents/SideBar.tsx";
import FolderList from "./Components/FolderList/FolderList.tsx";
import ActiveNote from "./Components/NoteComponents/ActiveNote.tsx";
import { FolderProvider } from "./context/FolderContext.tsx";
import { NoteProvider } from "./context/NoteContext.tsx";

function App() {
  return (
    <FolderProvider>
      <NoteProvider>
      <SideBar />
      <FolderList />
      <ActiveNote />
      </NoteProvider>
    </FolderProvider>
  );
}

export default App;
