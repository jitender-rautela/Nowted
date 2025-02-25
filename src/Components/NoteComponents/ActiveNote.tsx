import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useParams,
  useNavigate,
  useApiRequest,
  useLocation,
  PatchNoteInterface,
  NoteIdResponseInterface,
  customDate,
  FoldersResponseInterface,
} from "../../index.tsx";

function ActiveNote() {
  const navigate = useNavigate();
  const location = useLocation();
  const { noteId, folderId } = useParams();
  const [showNoteOptions, setshowNoteOptions] = useState(false);
  const [showChangeFolderOptions, setShowChangeFolderOptions] = useState(false);
  const [noteHeader, setNoteHeader] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");
  const [currentFolderId, setCurrentFolderId] = useState(folderId);
  const [currentFolderName, setCurrentFolderName] = useState<string>("");
  const [noteAttributes, setNoteAttributes] = useState({
    isFavorite: false,
    isArchived: false,
  });
  const isFavoritesFolderList = location.pathname.includes("/favorites");
  const isArchivesFolderList = location.pathname.includes("/archives");

  const optionsRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: fetchNoteData, callApi: fetchNote } =
    useApiRequest<NoteIdResponseInterface>();
  const { error: patchNoteError, callApi: patchNoteData } =
    useApiRequest<string>();

  const {
    error: deleteNoteError,
    loading: deleteNoteLoading,
    data: deleteNoteData,
    callApi: deleteNote,
  } = useApiRequest<string>();

  const {
    data: fetchFoldersData,
    loading: fetchFoldersLoading,
    error: fetchFoldersError,
    callApi: fetchFolders,
  } = useApiRequest<FoldersResponseInterface>();

  const { callApi: changeFolder } = useApiRequest<string>();

  const handleNoteOption = (e: React.MouseEvent) => {
    e.stopPropagation();
    setshowNoteOptions((prev) => {
      const newState = !prev;

      if (newState) {
        document.addEventListener("click", handleClickOutside);
      } else {
        document.removeEventListener("click", handleClickOutside);
      }

      return newState;
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target as Node)
    ) {
      setshowNoteOptions(false);
      document.removeEventListener("click", handleClickOutside);
    }
  };

  const handleNoteHeader = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteHeader(e.target.value);
    debounceSave(e.target.value, noteContent);
  };

  const handleNoteContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
    debounceSave(noteHeader, e.target.value);
  };

  const debounceSave = useCallback(
    (title: string, content: string) => {
      if (!noteId || !noteHeader) return;

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        const patchData: PatchNoteInterface = {
          folderId: folderId ?? currentFolderId ?? "",
          title,
          content,
          isFavorite: noteAttributes.isFavorite,
          isArchived: noteAttributes.isArchived,
        };
        await patchNoteData(`/notes/${noteId}`, "PATCH", patchData);
        console.log("Auto-saving...");
      }, 500);
    },
    [noteHeader, noteContent]
  );

  const toggleFavorite = async () => {
    const updatedAttributes = {
      ...noteAttributes,
      isFavorite: !noteAttributes.isFavorite,
    };
    setNoteAttributes(updatedAttributes);
    const response = await patchNoteData(`/notes/${noteId}`, "PATCH", {
      folderId,
      ...updatedAttributes,
    });

    if (response && isFavoritesFolderList) {
      navigate(`/favorites`);
    }
  };

  const toggleArchive = async () => {
    const updatedAttributes = {
      ...noteAttributes,
      isArchived: !noteAttributes.isArchived,
    };
    setNoteAttributes(updatedAttributes);
    const response = await patchNoteData(`/notes/${noteId}`, "PATCH", {
      folderId,
      ...updatedAttributes,
    });

    if (response) {

      if(isFavoritesFolderList){
        navigate("/favorites");
      }else if(isArchivesFolderList){
        navigate(`/folders/${currentFolderId}/notes/${noteId}`)

      }else{
        navigate(`/folders/${currentFolderId}/notes/${noteId}/archived`);
      }
    }
  };

  const handleDelete = () => {
    (async () => {
      const response = await deleteNote(`/notes/${noteId}`, "DELETE");

      if (response) {
        setshowNoteOptions(false);
        navigate(`/folders/${folderId}/notes/${noteId}/deleted`);
      }
    })();
  };

  const handleFolderOptions = async () => {
    setShowChangeFolderOptions((prev) => !prev);
    await fetchFolders("/folders", "GET");
  };

  const handleFolderChanage = async (
    changeFolderId: string,
    changeFolderName: string
  ) => {
    const response = await changeFolder(`/notes/${noteId}`, "PATCH", {
      folderId: changeFolderId,
    });

    if (response) {
      setShowChangeFolderOptions((prev) => !prev);
      navigate(`/folders/${changeFolderId}/notes/${noteId}`);
      setCurrentFolderName(changeFolderName);
    }
  };

  useEffect(() => {
    setshowNoteOptions(false);
    if (!noteId) return;
    (async () => {
      const response = await fetchNote(`/notes/${noteId}`, "GET");

      if (response?.note) {
        setCurrentFolderId(response?.note?.folder.id);
        setCurrentFolderName(response.note.folder.name);

        setNoteHeader(response.note.title || "");
        setNoteContent(response.note.content || "");
        setNoteAttributes((prev) => ({
          ...prev,
          isFavorite: response.note.isFavorite,
          isArchived: response.note.isArchived,
        }));

        if (response?.note.deletedAt) {
          navigate(`/trash/notes/${noteId}/deleted`);
        }
      }
      console.log("Note loaded..");
    })();
  }, [noteId]);

  if (
    patchNoteError &&
    fetchNoteData &&
    (noteAttributes.isFavorite !== fetchNoteData.note.isFavorite ||
      noteAttributes.isArchived !== fetchNoteData.note.isArchived)
  ) {
    console.log("unable to update...");
    setNoteAttributes({
      isFavorite: fetchNoteData.note.isFavorite,
      isArchived: fetchNoteData.note.isArchived,
    });
  }

  return (
    <div className="flex flex-col gap-8 p-12 w-full h-[1024px]">
      {/* Note Header */}
      <div className="flex justify-between w-[690px] h-[40px]">
        <textarea
          className="font-semibold text-2xl text-white bg-transparent outline-none resize-none overflow-hidden w-full"
          value={noteHeader}
          onChange={handleNoteHeader}
        />
        <div className="relative">
          <img
            className="w-8 h-8 cursor-pointer"
            src="../src/assets/note-option.svg"
            alt="Options"
            onClick={handleNoteOption}
          />
          {/* Note Options */}
          <div ref={optionsRef} className="absolute right-0 top-10 z-50">
            {showNoteOptions && (
              <div className="w-[220px] h-[165px] rounded-md p-[15px] flex flex-col gap-[20px] bg-[#333333]">
                <div
                  className="flex gap-[15px] cursor-pointer"
                  onClick={toggleFavorite}
                >
                  <img
                    src={
                      noteAttributes.isFavorite
                        ? "../src/assets/favorite-fill.svg"
                        : "../src/assets/favorites.svg"
                    }
                    alt="favorite_icon"
                  />
                  <span className="text-white text-[16px] hover:text-white/70">
                    {noteAttributes.isFavorite
                      ? "Remove from Favorite"
                      : "Add to Favorite"}
                  </span>
                </div>

                <div
                  className="flex gap-[15px] cursor-pointer"
                  onClick={toggleArchive}
                >
                  <img
                    src={
                      noteAttributes.isArchived
                        ? "../src/assets/archived-fill.svg"
                        : "../src/assets/archived.svg"
                    }
                    alt="archived_icon"
                  />
                  <span className="text-white text-[16px] hover:text-white/70">
                    {noteAttributes.isArchived
                      ? "Remove from Archive"
                      : "Archive"}
                  </span>
                </div>

                <hr className="h-[1px] bg-white/50 border-none" />

                <div
                  className="flex gap-[15px] cursor-pointer"
                  onClick={handleDelete}
                >
                  <img src="../src/assets/trash.svg" alt="trash_icon" />
                  <span className="text-white text-[16px] hover:text-white/70">
                    Delete
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Note Body */}
      <div className="w-[690px] flex flex-col gap-4">
        <div className="flex gap-6">
          <div className="flex gap-4 items-center">
            <img src="../src/assets/calender.svg" alt="Calendar" />
            <span className="theme-text-secondary text-sm">Date</span>
          </div>
          {fetchNoteData?.note?.updatedAt && (
            <span className="theme-text-primary text-sm">
              {customDate(new Date(fetchNoteData.note.updatedAt))}
            </span>
          )}
        </div>
        <hr />
        <div className="flex gap-6 relative">
          <div className="flex gap-4 items-center">
            <img src="../src/assets/folder-close.svg" alt="Folder" />
            <span className="theme-text-secondary text-sm">Folder</span>
          </div>

          <span
  className={`theme-text-primary text-sm relative z-10 cursor-pointer ${
    isFavoritesFolderList || isArchivesFolderList 
      ? "pointer-events-none opacity-50 no-underline" 
      : "underline decoration-white decoration-1"
  }`}
  onClick={!isFavoritesFolderList && !isArchivesFolderList ? handleFolderOptions : undefined}
>
            {currentFolderName}
          </span>
          {/* Change folder */}
          {showChangeFolderOptions && (
            <div className="absolute h-[155px] top-full left-0 mt-2 w-40 bg-[#1C1C1C] theme-text-primary p-2 rounded  z-20 overflow-scroll hide-scrollbar flex flex-col gap-1">
              {fetchFoldersLoading && (
                <p className="theme-text-primary">Loading...</p>
              )}
              {fetchFoldersError && (
                <p className="theme-text-primary">Error Loading Folders...</p>
              )}

              {fetchFoldersData?.folders.map((folder) => {
                return (
                  <span
                    className="theme-text-primary text-[14px] rounded-sm cursor-pointer p-1 hover:bg-white/30"
                    key={folder.id}
                    onClick={() => handleFolderChanage(folder.id, folder.name)}
                  >
                    {folder.name}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div>
        <textarea
          className="w-[690px] h-[700px] theme-text-primary text-base leading-[28px] overflow-scroll hide-scrollbar bg-transparent outline-none resize-none text-justify"
          value={noteContent}
          onChange={handleNoteContent}
        />
      </div>
    </div>
  );
}

export default ActiveNote;
