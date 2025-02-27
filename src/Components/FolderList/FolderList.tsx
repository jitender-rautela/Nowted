import "../../index.css";
import { useEffect, useState } from "react";
import {
  useFolders,
  useApiRequest,
  NavLink,
  useLocation,
  useParams,
  NoteResponseInterface,
  customDate,
} from "../../index.tsx";
import { toast } from "react-toastify";
import FolderListSkelaton from "../SkeletonLoaders/FolderListSkeleton.tsx";
function FolderList() {
  const location = useLocation();
  const { noteId, folderId } = useParams();
  const { selectedFolderName } = useFolders();
  const isArchived = location.pathname.includes("/archived");
  const isDeleted = location.pathname.includes("/deleted");
  const isFavoritesFolderList = location.pathname.includes("/favorites");
  const isTrashFolderList = location.pathname.includes("/trash");
  const isArchivesFolderList = location.pathname.includes("/archives");

  const [notes, setNotes] = useState<NoteResponseInterface["notes"]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const {
    loading: fetchNotesLoading,
    error: fetchNotesError,
    callApi: fetchNotes,
  } = useApiRequest<NoteResponseInterface>();

  const loadNotes = async (reset = false) => {
    if (loadingMore) return;
    setLoadingMore(true);

    const nextPage = reset ? 1 : page + 1;
    setPage(nextPage);

    let apiUrl = `/notes?page=${nextPage}&limit=10`;

    if (isTrashFolderList) apiUrl += `&deleted=true`;
    else if (folderId) apiUrl += `&folderId=${folderId}`;
    else if (isFavoritesFolderList) apiUrl += `&favorite=true`;
    else if (isArchivesFolderList) apiUrl += `&archived=true`;

    const response = await fetchNotes(apiUrl, "GET");

    if (!response) {
      toast.error(
        fetchNotesError?.error ||
          fetchNotesError?.message ||
          "Failed Fetching Notes"
      );
    }
    if (response?.notes) {
      setNotes(reset ? response.notes : [...notes, ...response.notes]);
      setHasMore(response.notes.length === 10);
    }

    setLoadingMore(false);
  };

  useEffect(() => {
    // if (isTrashFolderList) {
    //   setSelectedFolderName("Trash");
    // } else if (isFavoritesFolderList) {
    //   setSelectedFolderName("Favorites");
    // } else if (isArchivesFolderList) {
    //   setSelectedFolderName("Archives");
    // }

    setNotes([]);
    setPage(1);

    loadNotes(true);

    // if (isTrashFolderList) {
    //   setSelectedFolderName("Trash");
    // } else if (isFavoritesFolderList) {
    //   setSelectedFolderName("Favorites");
    // } else if (isArchivesFolderList) {
    //   setSelectedFolderName("Archives");
    // }else if(notes.length > 0){
    //  if(folderId){

    //   }
    // }
  }, [
    folderId,
    isArchived,
    isDeleted,
    isTrashFolderList,
    isFavoritesFolderList,
    isArchivesFolderList,
  ]);

  return (
    <>
      <div className="folder-list-container">
        <span className="folder-list-heading">{selectedFolderName}</span>

        <div className="folder-list-subcontainer overflow-scroll hide-scrollbar">
          {fetchNotesError && (
            <div className="theme-text-primary">
              Error loading notes. Please try again.
            </div>
          )}
          {fetchNotesLoading && <FolderListSkelaton />}

          {!fetchNotesLoading && !fetchNotesError && notes.length > 0
            ? notes.map((note) => (
                <NavLink
                  key={`${note.id}-${note.deletedAt}`}
                  to={
                    isTrashFolderList
                      ? `notes/${note.id}/deleted`
                      : `notes/${note.id}`
                  }
                >
                  <div
                    className={`note-container ${
                      noteId === note.id
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
                        {note.preview
                          ? note.preview.length > 20
                            ? `${note.preview.slice(0, 20)}...`
                            : note.preview
                          : "No preview available"}
                      </span>
                    </div>
                  </div>
                </NavLink>
              ))
            : !fetchNotesLoading &&
              !fetchNotesError && (
                <div className="text-gray-400 p-2">No notes available</div>
              )}

          {hasMore && !fetchNotesLoading && (
            <button
              onClick={() => loadNotes()}
              className="load-more-btn mt-4 p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md w-full"
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default FolderList;
