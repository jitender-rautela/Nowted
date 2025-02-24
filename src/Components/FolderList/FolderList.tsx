import "../../index.css";
import { useEffect } from "react";
import {
  useFolders,
  useApiRequest,
  NavLink,
  useLocation,
  useParams,
  NoteResponseInterface,
  customDate,
} from "../../index.tsx";

function FolderList() {
  const location = useLocation();
  const { noteId, folderId } = useParams();
  const { selectedFolderName } = useFolders();
  const isArchived = location.pathname.includes("/archived");
  const isDeleted = location.pathname.includes("/deleted");
  const isFavorites = location.pathname.includes("/favorites");
  const istrashFolderList = location.pathname.includes("/trash");
  const selectedNoteId = noteId;

  const {
    data: fetchNotesData,
    loading: fetchNotesLoading,
    error: fetchNotesError,
    callApi: fetchNotes,
  } = useApiRequest<NoteResponseInterface>();

  useEffect(() => {
    (async () => {
      // console.log("Effect triggered:", {
      //   folderId,
      //   isArchived,
      //   isDeleted,
      //   isFavorites,
      // });

      let apiUrl = "";

      if (istrashFolderList) {
        apiUrl = `/notes?deleted=${true}`;
      } else if (folderId) {
        apiUrl = `/notes?folderId=${folderId}`;
      }

      if (apiUrl) {
        await fetchNotes(apiUrl, "GET");
        console.log("Fetching notes:", apiUrl);
      }
    })();
  }, [folderId, isArchived, isDeleted,istrashFolderList]);

  return (
    <div className="folder-list-container">
      <span className="folder-list-heading">{selectedFolderName}</span>

      <div className="folder-list-subcontainer overflow-scroll hide-scrollbar">
        {/* Show loading */}
        {fetchNotesLoading && (
          <div className="theme-text-primary">Loading notes...</div>
        )}

        {/* Show error message  */}
        {fetchNotesError && (
          <div className="theme-text-primary">
            Error loading notes. Please try again.
          </div>
        )}

        {!fetchNotesLoading &&
        !fetchNotesError &&
        (fetchNotesData?.notes || []).length > 0
          ? fetchNotesData?.notes.map((note) => (
              <NavLink
                key={`${note.id}-${note.deletedAt}`}
                
                to={istrashFolderList?`notes/${note.id}/deleted`:`notes/${note.id}`}
              >
                <div
                  className={`note-container ${
                    selectedNoteId === note.id
                      ? "bg-white/10"
                      : "bg-[rgba(255,255,255,0.03)]"
                  }`}
                >
                  <span className="note-container-heading">{note.title}</span>
                  <div className="flex gap-[10px]">
                    <span className="note-date">
                      {customDate(new Date(note.updatedAt))}
                    </span>
                    <span className="note-preview">
                      {note.preview.length > 20
                        ? `${note.preview.slice(0, 20)}...`
                        : note.preview}
                    </span>
                  </div>
                </div>
              </NavLink>
            ))
          : //no notes are found
            !fetchNotesLoading &&
            !fetchNotesError && (
              <div className="text-gray-400 p-2">No notes available</div>
            )}
      </div>
    </div>
  );
}

export default FolderList;
