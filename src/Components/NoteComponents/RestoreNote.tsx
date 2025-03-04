import { NavLink, useParams } from "react-router-dom";
import "../../index.css";
import useApiRequest from "../../hooks/useApiRequest";
import { useEffect, useState } from "react";
import { NoteIdResponseInterface } from "../../interface/Interface";
import { toast } from "react-toastify";
import documentIcon from "../../assets/document.svg"

function RestoreNote() {
  const { noteId, folderId } = useParams();
 const [currentFolderId, setCurrentFolderId] = useState(folderId);

  const { callApi: patchRestoreNote } = useApiRequest<string>();
  const {callApi: fetchNote} = useApiRequest<NoteIdResponseInterface>();

  const handleRestore = async () => {
    const response = await patchRestoreNote(`/notes/${noteId}/restore`, "POST");
    if(response){
      toast.success(response);
    }else{
      toast.error("Restoring Failed")
    }
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
      <img src={documentIcon} alt="document img" />
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
