import { useEffect } from "react";
import { useFolders } from "../../context/FolderContext";
import "../../index.css";
import useApiRequest from "../../networkComponent/useApiRequest";
import { useNotes } from "../../context/NoteContext";

function FolderList() {

  const{selectedNote, setSelectedNote} = useNotes()
  
  const {
    data: fetchNoteData,
    loading: fetchNoteLoading,
    error: fetchNoteError,
    callApi: fetchNote,
  } = useApiRequest();

  const{ folderList, selectedFolderName} = useFolders()
  // console.log(selectedFolderName);
  
  const created = (date: Date) => date.toLocaleDateString();

  const handleNoteClick = async(e:React.MouseEvent,noteId:string)=>{

    try {
      await fetchNote(`/notes/${noteId}`,"GET")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(fetchNoteData?.note)setSelectedNote(fetchNoteData.note)

  },[fetchNoteData])



  return (
    <div className="folder-list-container">
      <span className="folder-list-heading">{selectedFolderName}</span>

      <div className="folder-list-subcontainer overflow-scroll hide-scrollbar">
        {folderList?.map((note) => {
          return (
            <div className="note-container" key={note.id} onClick={(event)=>handleNoteClick(event,note.id)}>
              <span className="note-container-heading">{note.title}</span>
              <div className="flex gap-[10px]">
                
              <span className="note-date">{created(new Date(note.createdAt))}</span>


                <span className="note-preview">{note.preview.length > 20 ? `${note.preview.slice(0,20)}...`: note.preview}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



export default FolderList;
