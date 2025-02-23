import "../../index.css"
import {EmptyNote,ActiveNote, RestoreNote,useMatch,  useParams,} from "../../index.tsx"

function NoteView() {
  const { noteId, folderId } = useParams();
  
  const isDeleted = useMatch(`/folders/${folderId}/notes/${noteId}/deleted`);
  const isArchived = useMatch(`/folders/${folderId}/notes/${noteId}/archived`);

  if (isDeleted) return <RestoreNote />;
  if (!noteId || isArchived) return <EmptyNote />;

  return <ActiveNote />;
}

export default NoteView;
