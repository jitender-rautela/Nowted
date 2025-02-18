import { useEffect } from "react";
import "../../index.css";
import { useFolders } from "../../context/FolderContext";
import { useNotes } from "../../context/NoteContext";
import useApiRequest from "../../networkComponent/useApiRequest";
import { NavLink } from "react-router-dom";

function FolderList() {
  // const { selectedNote, setSelectedNote } = useNotes();

  // const {
  //   data: fetchNoteData,
  //   loading: fetchNoteLoading,
  //   error: fetchNoteError,
  //   callApi: fetchNote,
  // } = useApiRequest();

  const { folderList, selectedFolderName } = useFolders();

  const created = (date: Date) => date.toLocaleDateString();

  // const handleNoteClick = async (e: React.MouseEvent, noteId: string) => {
  //   try {
  //     await fetchNote(`/notes/${noteId}`, "GET");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (fetchNoteData?.note) setSelectedNote(fetchNoteData.note);
  // }, [fetchNoteData]);

  return (
    <div className="folder-list-container">
      <span className="folder-list-heading">{selectedFolderName}</span>

      <div className="folder-list-subcontainer overflow-scroll hide-scrollbar">
        {folderList?.map((note) => {
          return (
            <NavLink key={note.id} to={`notes/${note.id}`}>
              <div
                className="note-container"
                // onClick={(event) => handleNoteClick(event, note.id)}
              >
                <span className="note-container-heading">{note.title}</span>
                <div className="flex gap-[10px]">
                  <span className="note-date">
                    {created(new Date(note.createdAt))}
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
