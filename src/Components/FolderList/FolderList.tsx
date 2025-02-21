import { useEffect } from "react";
import "../../index.css";
import { useFolders } from "../../context/FolderContext";
import useApiRequest from "../../networkComponent/useApiRequest";
import { NavLink, useLocation, useParams } from "react-router-dom";

function fetchNotesData() {


  const {
    data: fetchNotesData,
    loading: fetchNotesLoading,
    error: fetchNotesError,
    callApi: fetchNotes,
  } = useApiRequest();

  const created = (date: Date) => date.toLocaleDateString();

  const {selectedFolderName } = useFolders();
  const {folderId} = useParams();
  const location = useLocation();

  useEffect(()=>{
    ;(async()=>{
      await fetchNotes(`/notes?folderId=${folderId}`,"GET")
    })()
  },[folderId, location.key])



  return (
    <div className="folder-list-container">
      <span className="folder-list-heading">{selectedFolderName}</span>

      <div className="folder-list-subcontainer overflow-scroll hide-scrollbar">
        {fetchNotesData?.notes?.map((note) => {
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

export default fetchNotesData;
