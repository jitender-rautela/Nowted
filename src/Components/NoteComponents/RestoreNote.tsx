import { useNavigate, useParams } from "react-router-dom";
import "../../index.css";
import useApiRequest from "../../networkComponent/useApiRequest";

function RestoreNote() {
  const {noteId, folderId}= useParams()
  const navigate = useNavigate()

  const {
    callApi : patchRestoreNote,
   } = useApiRequest()

  const handleRestore = async()=>{
    await patchRestoreNote(`/notes/${noteId}/restore`,"POST")
    navigate(`/folders/${folderId}/notes/${noteId}`)
    
  }

  return (
    <div className="note-view-container">
      <img src="../src/assets/document.svg" alt="document img" />
      <p className="note-view-h">Restore Note</p>
      <p className="note-view-p">
        Don't want to lose this note? It's not too late! Just click the
        'Restore' button and it will be added back to your list. It's that
        simple.
      </p>
      <input type="button" value="Restore" className="note-view-btn"  onClick={handleRestore}/>
    </div>
  );
}

export default RestoreNote;
