import { useEffect, useRef, useState } from "react";
import NoteOption from "./NoteOption";
import { useNotes } from "../../context/NoteContext";

function ActiveNote() {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const { selectedNote } = useNotes();

  const created = (date: Date) => date.toLocaleDateString();

  const handleNoteOption = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions((prev) => !prev);
  };

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

  if (!selectedNote) {
    return (
      <div className="flex items-center justify-center w-full h-[1024px] text-white text-xl">
        No note selected
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-12 w-full h-[1024px]">
      <div className="flex justify-between w-[690px] h-[40px]">
        <span className="font-semibold text-2xl text-white">
          {selectedNote.title}
        </span>
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
          <span className="text-white text-sm">{created(new Date(selectedNote.createdAt))}</span>
        </div>

        <hr />

        <div className="flex gap-6">
          <div className="flex gap-4 items-center">
            <img src="../src/assets/folder-close.svg" alt="Folder" />
            <span className="text-white/60 text-sm">Folder</span>
          </div>
          <span className="text-white text-sm">{selectedNote.folder.name}</span>
        </div>
      </div>

      <div>
        <p className="w-[690px] h-[700px] text-white text-base leading-[28px]">
          {selectedNote.content || "No content available"}
        </p>
      </div>
    </div>
  );
}

export default ActiveNote;
