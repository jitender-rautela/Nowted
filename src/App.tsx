import SideBar from "./Components/SideBarComponents/SideBar.tsx"
import FolderList from "./Components/FolderList.tsx";
import EmptyNote from "./Components/NoteComponents/EmptyNote.tsx";
import RestoreNote from "./Components/NoteComponents/RestoreNote.tsx";
import ActiveNote from "./Components/NoteComponents/ActiveNote.tsx";
import NoteOption from "./Components/NoteComponents/NoteOption.tsx";

function App() {
  return (<>
  <SideBar/>
  <FolderList/>
  {/* <EmptyNote/> */}
  {/* <RestoreNote/> */}
  <ActiveNote/>
  {/* <NoteOption/> */}
  </>
  )
 
}

export default App;
