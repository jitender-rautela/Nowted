import "../../index.css";
import { useEffect } from "react";
import {
  useApiRequest,
  RecentResponseInterface,
  NoteInterface,
  NavLink,
  useParams,  
} from "../../index.tsx";
import RecentsSkeleton from "../SkeletonLoaders/RecentsSkeleton.tsx";

function Recents() {
  const { noteId,} = useParams();
  const {
    data: recentNotesData,
    error: recentNotesError,
    loading: recentNotesLoading,
    callApi: fetchRecentNotes,
  } = useApiRequest<RecentResponseInterface>();

  useEffect(() => {
    (async () => {
        await fetchRecentNotes("/notes/recent", "GET");
        console.log("Fetch complete.");     
    })();
  }, [noteId]); 

  return (
    <div className="sidebar-subcontainer h-[156px]">
      <span className="sidebar-heading">Recents</span>
      <div className="flex flex-col gap-1 w-full h-full">
        {/* Loading State */}
        {recentNotesLoading && <RecentsSkeleton/>}

        {/* Error State */}
        {recentNotesError && (
          <p className="theme-text-primary">Error loading data. Please try again.</p>
        )}

       
        {!recentNotesLoading &&
          !recentNotesError &&
          (recentNotesData?.recentNotes?.length ? (
            recentNotesData.recentNotes.map((note: NoteInterface) => (
              <NavLink
                key={note.id}
                to={`/folders/${note.folderId}/notes/${note.id}`} 
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
            ))
          ) : (
            <p className="text-gray-400">No recent notes found.</p>
          ))}
      </div>
    </div>
  );
}

export default Recents;
