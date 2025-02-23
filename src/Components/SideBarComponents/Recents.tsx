import "../../index.css";
import { useEffect } from "react";
import {
  useApiRequest,
  RecentResponseInterface,
  NoteInterface,
  NavLink,
  useParams,
} from "../../index.tsx";

function Recents() {
  const { noteId } = useParams();
  const {
    data: recentNotesData,
    loading: recentNotesLoading,
    error: recentNotesError,
    callApi: fetchRecentNotes,
  } = useApiRequest<RecentResponseInterface>();

  useEffect(() => {
    (async () => {
      try {
        console.log("Fetching...");
        await fetchRecentNotes("/notes/recent", "GET");
        console.log("done");
      } catch (error) {
        console.log(error);
      }
    })();
  }, [noteId]);

  return (
    <div className="sidebar-subcontainer h-[156px]">
      <span className="sidebar-heading">Recents</span>
      <div className="flex flex-col gap-1 w-full h-full">
        {recentNotesLoading && <p className="text-white">Loading...</p>}
        {recentNotesError && <p className="text-white">Error loading data</p>}
        {recentNotesData?.recentNotes?.map((note: NoteInterface) => (
          <NavLink
            key={note.id}
            to={`/folders/${note.folderId}/notes/${note.id}`} // Fixed template string issue
          >
            <div
              className={`file-item rounded-md group ${
                noteId === note.id ? "bg-[#312EB5]" : "hover:bg-[#312EB5]"
              }`}
            >
              <img
                className={`w-6 h-6 ${
                  noteId === note.id ? "hidden" : "group-hover:hidden"
                }`}
                src="../src/assets/file.svg"
                alt="file img"
              />
              <img
                className={`w-6 h-6 ${
                  noteId === note.id ? "block" : "hidden group-hover:block"
                }`}
                src="../src/assets/file-focus.svg"
                alt="file img"
              />
              <span
                className={`file-text ${
                  noteId === note.id ? "text-white" : "group-hover:text-white"
                }`}
              >
                {note.title}
              </span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Recents;
