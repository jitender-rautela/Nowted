export { useFolders } from "./context/FolderContext";
export { default as useApiRequest } from "./hooks/useApiRequest.tsx";
export { NavLink, useNavigate, useParams, useLocation,useMatch } from "react-router-dom";
export type {
  FoldersResponseInterface,
  RecentResponseInterface,
  NoteInterface,
  NoteResponseInterface,
  PatchNoteInterface,
  NoteIdResponseInterface
} from "./interface/Interface.tsx";
export { default as Recents } from "./Components/SideBarComponents/Recents.tsx";
export { default as Folders } from "./Components/SideBarComponents/Folders.tsx";
export { default as More } from "./Components/SideBarComponents/More.tsx";
export {default as EmptyNote} from "./Components/NoteComponents/EmptyNote.tsx"
export {default as RestoreNote} from "./Components/NoteComponents/RestoreNote.tsx"
export {default as ActiveNote} from "./Components/NoteComponents/ActiveNote.tsx"


export {customDate} from "./hooks/Date.tsx"
