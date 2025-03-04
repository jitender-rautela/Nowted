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
import { toast } from "react-toastify";
import ActiveNoteSkelaton from "../SkeletonLoaders/ActiveNoteSkeleton.tsx";
import noteOptionIcon from "../../assets/note-option.svg";
import favoriteIcon from "../../assets/favorites.svg";
import favoriteFillIcon from "../../assets/favorite-fill.svg";
import archiveIcon from "../../assets/archived.svg";
import archiveFillIcon from "../../assets/archived-fill.svg";
import trashIcon from "../../assets/trash.svg";
import calendarIcon from "../../assets/calender.svg";
import folderIcon from "../../assets/folder-close.svg";


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

  const {
    data: fetchNoteData,
    loading: fetchNoteLoading,
    callApi: fetchNote,
  } = useApiRequest<NoteIdResponseInterface>();
  const { error: patchNoteError, callApi: patchNoteData } =
    useApiRequest<string>();

  const { callApi: deleteNote } = useApiRequest<string>();

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
        if (title === "") {
          toast.error("Note Heading can't be Empty");
          return;
        }
        const patchData: PatchNoteInterface = {
          folderId: folderId ?? currentFolderId ?? "",
          title,
          content,
          isFavorite: noteAttributes.isFavorite,
          isArchived: noteAttributes.isArchived,
        };
        const response = await patchNoteData(
          `/notes/${noteId}`,
          "PATCH",
          patchData
        );
        if (response) {
          toast.success(response);
        } else {
          toast.error("Note update Failed");
        }
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

    if (!response) {
      toast.error("Request failed");
    } else {
      toast.success(response);
    }

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
      toast.success(response);
      if (isFavoritesFolderList) {
        navigate("/favorites");
      } else {
        navigate(`/folders/${currentFolderId}/notes/${noteId}/archived`);
      }
    } else {
      toast.error("Note update Failed");
    }
  };

  const handleDelete = () => {
    (async () => {
      const response = await deleteNote(`/notes/${noteId}`, "DELETE");
      setshowNoteOptions(false);

      if (response) {
        if (isFavoritesFolderList) {
          navigate("/favorites");
        } else if (isArchivesFolderList) {
          navigate("/archives");
        } else {
          navigate(`/folders/${folderId}/notes/${noteId}/deleted`);
        }
        toast.success("Note deleted successfully");
      } else {
        toast.error("Request Failed");
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
    setShowChangeFolderOptions((prev) => !prev);

    if (response) {
      toast.success(response);
      navigate(`/folders/${changeFolderId}/notes/${noteId}`);
      setCurrentFolderName(changeFolderName);
    } else {
      toast.error("Note update failed");
    }
  };

  useEffect(() => {
    setshowNoteOptions(false);
    if (!noteId) return;
    (async () => {
      const response = await fetchNote(`/notes/${noteId}`, "GET");

      if (!response) {
        toast.error("Note not found");
      } else if (response?.note) {
        if (response?.note.deletedAt) {
          navigate(`/trash/notes/${noteId}/deleted`);
        }

        setCurrentFolderId(response?.note?.folder.id);
        setCurrentFolderName(response.note.folder.name);

        setNoteHeader(response.note.title || "");
        setNoteContent(response.note.content || "");
        setNoteAttributes((prev) => ({
          ...prev,
          isFavorite: response.note.isFavorite,
          isArchived: response.note.isArchived,
        }));
      }
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
    <div className="flex flex-col gap-8 p-12 w-full h-screen  pr-8 pl-8">
      {/* Note Header */}
      {fetchNoteLoading ? (
        <ActiveNoteSkelaton />
      ) : fetchNoteData?.note ? (
        <>
          {/* Note Header */}
          <div className="flex justify-between w-full h-[40px]">
            <textarea
              className="font-semibold text-2xl theme-text-primary bg-transparent outline-none resize-none overflow-hidden w-full"
              value={noteHeader}
              onChange={handleNoteHeader}
            />
            <div className="relative">
              <img
                className="w-8 h-8 cursor-pointer"
                src={noteOptionIcon}
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
                            ? favoriteFillIcon
                            :favoriteIcon
                        }
                        alt="favorite_icon"
                      />
                      <span className="theme-text-primary text-[16px] hover:text-white/70">
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
                            ? archiveFillIcon
                            : archiveIcon
                        }
                        alt="archived_icon"
                      />
                      <span className="theme-text-primary text-[16px] hover:text-white/70">
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
                      <img src={trashIcon} alt="trash_icon" />
                      <span className="theme-text-primary text-[16px] hover:text-white/70">
                        Delete
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Note Body */}
          <div className="w-full flex flex-col gap-4">
            <div className="flex gap-6">
              <div className="flex gap-4 items-center">
                <img src={calendarIcon} alt="Calendar" />
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
                <img src={folderIcon} alt="Folder" />
                <span className="theme-text-secondary text-sm">Folder</span>
              </div>

              <span
                className={`theme-text-primary text-sm relative z-10 cursor-pointer ${
                  isFavoritesFolderList || isArchivesFolderList
                    ? "pointer-events-none opacity-50 no-underline"
                    : "underline decoration-white decoration-1"
                }`}
                onClick={
                  !isFavoritesFolderList && !isArchivesFolderList
                    ? handleFolderOptions
                    : undefined
                }
              >
                {currentFolderName}
              </span>

              {/* Change folder */}
              {showChangeFolderOptions && (
                <div className="absolute h-[155px] top-full left-0 mt-2 w-40 theme-bg-primary theme-text-primary p-2 rounded  z-20 overflow-scroll hide-scrollbar flex flex-col gap-1">
                  {fetchFoldersLoading && (
                    <p className="theme-text-primary">Loading...</p>
                  )}
                  {fetchFoldersError && (
                    <p className="theme-text-primary">
                      Error Loading Folders...
                    </p>
                  )}

                  {fetchFoldersData?.folders.map((folder) => {
                    return (
                      <span
                        className="theme-text-primary text-[14px] rounded-sm cursor-pointer p-1 hover:bg-white/30"
                        key={folder.id}
                        onClick={() =>
                          handleFolderChanage(folder.id, folder.name)
                        }
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
              className="w-full h-[550px] theme-text-primary text-base leading-[28px] overflow-scroll hide-scrollbar bg-transparent outline-none resize-none text-justify"
              value={noteContent}
              onChange={handleNoteContent}
            />
          </div>
        </>
      ) : (
        <p className="theme-text-primary">Error loading note...</p>
      )}
    </div>
  );
}

export default ActiveNote;
