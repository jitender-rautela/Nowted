import React, { useEffect, useRef, useState } from "react";
import NoteOption from "./NoteOption";
import EmptyNote from "./EmptyNote";
import { useParams } from "react-router-dom";
import useApiRequest from "../../networkComponent/useApiRequest";

function ActiveNote() {
  const [noteHeader, setNoteHeader] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");
  const [showOptions, setShowOptions] = useState(false);
  
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const { noteId } = useParams();
  const {
    data: fetchNoteData,
    callApi: fetchNote,
  } = useApiRequest();

  const {
    data: patchNoteData,
    callApi:patchNote,
  } = useApiRequest();

  useEffect(() => {
    if (!noteId) return;
    (async () => {
      try {
        await fetchNote(`/notes/${noteId}`, "GET");
        console.log("Notes loaded..");
      } catch (error) {
        console.log(error);
      }
    })();
  }, [noteId]);

  useEffect(() => {
    if (fetchNoteData) {
      setNoteHeader(fetchNoteData.note.title || "");
      setNoteContent(fetchNoteData.note.content || "");
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

  const handleNoteOption = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions((prev) => !prev);
  };

  useEffect(() => {
    if (!noteId || (!noteHeader && !noteContent)) return;

    const debouncePatch = setTimeout(() => {
      patchNote(`/notes/${noteId}`, "PATCH", {
        title: noteHeader,
        content: noteContent,
      });
      console.log("Auto-saving...");
    }, 500); 

    return () => clearTimeout(debouncePatch); 
  }, [noteHeader, noteContent]);

  

  const handleNoteHeader = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteHeader(e.target.value);
  };

  const handleNoteContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
  };

  if (!fetchNoteData || !noteId) return <EmptyNote />;

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
          {showOptions && (
            <div ref={optionsRef} className="absolute right-0 top-10 z-50">
              <NoteOption />
            </div>
          )}
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
