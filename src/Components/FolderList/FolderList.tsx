import { useEffect } from "react";
import "../../index.css";
import { useFolders } from "../../context/FolderContext";
import useApiRequest from "../../hooks/useApiRequest";
import { NavLink, useLocation, useParams } from "react-router-dom";

function FolderList() {
  const location = useLocation();
  const isArchived = location.pathname.includes("/archived");
  const isDeleted = location.pathname.includes("/deleted");
  const isFavorites = location.pathname.includes("/favorites");
  const { noteId } = useParams();
  const selectedNoteId = noteId;

  const {
    data: fetchNotesData,
    loading: fetchNotesLoading,
    error: fetchNotesError,
    callApi: fetchNotes,
  } = useApiRequest();

  const created = (date: Date) =>
    `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;

  const { selectedFolderName } = useFolders();
  const { folderId } = useParams();

  useEffect(() => {
    (async () => {
      console.log("Effect triggered:", {
        folderId,
        isArchived,
        isDeleted,
        isFavorites,
      });

      let apiUrl = "";

      if (isFavorites) {
        apiUrl = `/notes?favorites=${true}`;
      } else if (folderId) {
        apiUrl = `/notes?folderId=${folderId}`;
      }

      if (apiUrl) {
        await fetchNotes(apiUrl, "GET");
        console.log("Fetching notes:", apiUrl);
      }
    })();
  }, [folderId, isArchived, isDeleted, isFavorites]);

  return (
    <div className="folder-list-container">
      <span className="folder-list-heading">{selectedFolderName}</span>

      <div className="folder-list-subcontainer overflow-scroll hide-scrollbar">
        {fetchNotesData?.notes?.map((note) => {
          return (
            <NavLink
              key={`${note.id}-${note.deletedAt}`}
              to={`notes/${note.id}`}
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
                    {created(new Date(note.updatedAt))}
                  </span>

                  <span className="note-preview">
                    {note.preview.length > 20
                      ? `${note.preview.slice(0, 20)}...`
                      : note.preview}
                  </span>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default FolderList;
