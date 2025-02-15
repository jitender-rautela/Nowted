import "../../index.css";

function EmptyNote() {
  return (
    <div className="note-view-container">
      <img src="../src/assets/document.svg" alt="document img" />
            <p className="note-view-h">Select a not to view</p>
            <p className="note-view-p">choose a note from the list on the left to view its contents, or create a new note to add to your collection.</p>
    </div>
  );
}

export default EmptyNote;
