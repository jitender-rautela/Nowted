import { NavLink, useParams } from "react-router-dom";
import "../../index.css";
import useApiRequest from "../../hooks/useApiRequest";
import { useEffect, useState } from "react";
import { NoteIdResponseInterface } from "../../interface/Interface";

function RestoreNote() {
  const { noteId, folderId } = useParams();
 const [currentFolderId, setCurrentFolderId] = useState(folderId);

  const { callApi: patchRestoreNote } = useApiRequest();
  const {callApi: fetchNote} = useApiRequest<NoteIdResponseInterface>();

  const handleRestore = async () => {
    await patchRestoreNote(`/notes/${noteId}/restore`, "POST");
  };

  useEffect(()=>{
    if (!noteId) return;
    if(folderId)return;
    (async () => {
      const response = await fetchNote(`/notes/${noteId}`, "GET");

      if(response?.note?.folder.id){
        setCurrentFolderId(response.note.folder.id)
      }
    })();

  },[noteId])

  return (
    <div className="note-view-container">
      <img src="../src/assets/document.svg" alt="document img" />
      <p className="note-view-h">Restore Note</p>
      <p className="note-view-p">
        Don't want to lose this note? It's not too late! Just click the
        'Restore' button and it will be added back to your list. It's that
        simple.
      </p>
      <NavLink to={`/folders/${currentFolderId}/notes/${noteId}`} key={noteId}>
        <input
          type="button"
          value="Restore"
          className="note-view-btn"
          onClick={handleRestore}
        />
      </NavLink>
    </div>
  );
}

export default RestoreNote;
