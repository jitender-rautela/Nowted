import "../../index.css";

function RestoreNote() {
  return (
    <div className="note-view-container">
         <img src="../src/assets/document.svg" alt="document img" />
      <p className="note-view-h">Restore "Reflection on the Month of June"</p>
      <p className="note-view-p">
        Don't want to lose this note? It's not too late! Just click the 'Restore' button and it will be added back to your list. It's that  simple.
      </p>
      <input type="button" value="Restore" className="note-view-btn" />
    </div>
  );
}

export default RestoreNote;
