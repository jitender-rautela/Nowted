import React, { useEffect, useRef, useState } from "react";
import EmptyNote from "./EmptyNote";
import { useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import useApiRequest from "../../networkComponent/useApiRequest";
import RestoreNote from "./RestoreNote";

interface PatchData {
  folderId: string;
  title?: string;
  content?: string;
  isFavorite?: boolean;
  isArchived?: boolean;
}

function ActiveNote() {
  const { noteId, folderId } = useParams();
  const navigate = useNavigate();
  const [noteHeader, setNoteHeader] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");
  // const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const isDeleted = useMatch(`/folders/:${folderId}/notes/:${noteId}/deleted`)
  const isArchived = useMatch(`/folders/:${folderId}/notes/:${noteId}/archieved`)
  const [showOptions, setShowOptions] = useState(false);

  const [noteAttributes, setNoteAttributes] = useState({
    isFavorite: false,
    isArchived: false,
  });

  const optionsRef = useRef<HTMLDivElement | null>(null);
  const { data: fetchNoteData, callApi: fetchNote } = useApiRequest();

  const { error: patchNoteError, callApi: patchNoteData } = useApiRequest();

  const{
    error:deleteNoteError,
    loading:deleteNoteLoading,
    data:deleteNoteData,
    callApi:deleteNote
  } = useApiRequest()

  const handleNoteHeader = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteHeader(e.target.value);
  };

  const handleNoteOption = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions((prev) => !prev);
  };
  const handleNoteContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
  };
  const toggleFavorite = async () => {
    const updatedAttributes = {
      ...noteAttributes,
      isFavorite: !noteAttributes.isFavorite,
    };
    setNoteAttributes(updatedAttributes);
    await patchNoteData(`/notes/${noteId}`, "PATCH", {
      folderId,
      ...updatedAttributes,
    });
    console.log("waiting...");
  };

  const toggleArchive = async () => {
    const updatedAttributes = {
      ...noteAttributes,
      isArchived: !noteAttributes.isArchived,
    };
    setNoteAttributes(updatedAttributes);
    await patchNoteData(`/notes/${noteId}`, "PATCH", {
      folderId,
      ...updatedAttributes,
    });
    navigate(`/folders/${folderId}/notes/${noteId}/archived`);
  };

  const handleDelete = ()=>{

    (async()=>deleteNote(`/notes/${noteId}`,"DELETE"))();
    setShowOptions(false)
    navigate(`/folders/${folderId}/notes/${noteId}/deleted`);

  }

  useEffect(() => {
    setShowOptions(false)
    if (!noteId) return;
    ;(async () => {
      try {
        await fetchNote(`/notes/${noteId}`, "GET");
        console.log("Notes loaded..");
      } catch (error) {
        console.log(error);
        console.log("errorrr");
      }
    })();
  }, [noteId]);

  useEffect(() => {
    if (fetchNoteData) {
      setNoteHeader(fetchNoteData.note.title || "");
      setNoteContent(fetchNoteData.note.content || "");
      setNoteAttributes((prev) => ({
        ...prev,
        isFavorite: fetchNoteData.note.isFavorite,
        isArchived: fetchNoteData.note.isArchived,
      }));
    }
  }, [fetchNoteData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!noteId || !noteHeader) return;
    const patchData: PatchData = {
      folderId: folderId ? folderId : "",
      title: noteHeader,
      content: noteContent,
      isFavorite: noteAttributes.isFavorite,
      isArchived: noteAttributes.isArchived,
    };

    const timer = setTimeout(() => {
      patchNoteData(`/notes/${noteId}`, "PATCH", patchData);
      console.log("Auto-saving...");
    }, 500);

    return () => clearTimeout(timer);
  }, [noteHeader, noteContent]);

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
  
  if(isDeleted)return <RestoreNote/>
  if (!fetchNoteData || !noteId || isArchived) return <EmptyNote />

  return (
    <div className="flex flex-col gap-8 p-12 w-full h-[1024px]">
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
          <div ref={optionsRef} className="absolute right-0 top-10 z-50">
            {showOptions && (
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
                    alt="favorite_icon"
                  />
                  <span className="text-white text-[16px] hover:text-white/70">
                    {noteAttributes.isArchived
                      ? "Remove from Archive"
                      : "Archive"}
                  </span>
                </div>

                <hr className="h-[1px] bg-white/50 border-none" />

                <div className="flex gap-[15px] cursor-pointer"
                onClick={handleDelete}>
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

      <div className="w-[690px] flex flex-col gap-4">
        <div className="flex gap-6">
          <div className="flex gap-4 items-center">
            <img src="../src/assets/calender.svg" alt="Calendar" />
            <span className="text-white/60 text-sm">Date</span>
          </div>
          <span className="text-white text-sm">
            {new Date(fetchNoteData.note.createdAt).toLocaleDateString()}
          </span>
        </div>
        <hr />
        <div className="flex gap-6">
          <div className="flex gap-4 items-center">
            <img src="../src/assets/folder-close.svg" alt="Folder" />
            <span className="text-white/60 text-sm">Folder</span>
          </div>
          <span className="text-white text-sm">
            {fetchNoteData.note.folder?.name || "No Folder"}
          </span>
        </div>
      </div>

      <div>
        <textarea
          className="w-[690px] h-[700px] text-white text-base leading-[28px] overflow-scroll hide-scrollbar bg-transparent outline-none resize-none"
          value={noteContent}
          onChange={handleNoteContent}
        />
      </div>
    </div>
  ); 
}

export default ActiveNote;
