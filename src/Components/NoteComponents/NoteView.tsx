import "../../index.css";
import {
  EmptyNote,
  ActiveNote,
  RestoreNote,
  useParams,
  useLocation,
} from "../../index.tsx";

function NoteView() {
  const { noteId } = useParams();
  const location = useLocation();
  const isDeleted = location.pathname.includes(`/deleted`);
  const isArchived = location.pathname.includes(`/archived`);
  // const trashNotes = location.pathname.includes(`/trash`);
  // const favoritesNote = location.pathname.includes(`/favorites`);
  const archivedNote = location.pathname.includes(`/archived`);



  if (isDeleted) return <RestoreNote />;
  if (!noteId || isArchived ) return <EmptyNote />;

  return <ActiveNote />;
}

export default NoteView;
