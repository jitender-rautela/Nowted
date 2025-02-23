import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../../index.css";
import useApiRequest from "../../hooks/useApiRequest";

function RestoreNote() {
  const { noteId, folderId } = useParams();
  const navigate = useNavigate();

  const { callApi: patchRestoreNote } = useApiRequest();

  const handleRestore = async () => {
    await patchRestoreNote(`/notes/${noteId}/restore`, "POST");
  };

  return (
    <div className="note-view-container">
      <img src="../src/assets/document.svg" alt="document img" />
      <p className="note-view-h">Restore Note</p>
      <p className="note-view-p">
        Don't want to lose this note? It's not too late! Just click the
        'Restore' button and it will be added back to your list. It's that
        simple.
      </p>
      <NavLink to={`/folders/${folderId}/notes/${noteId}`} key={noteId}>
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
