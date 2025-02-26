const FolderListSkelaton = () => {
    return (
        <div className="folder-list-subcontainer overflow-scroll hide-scrollbar">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="note-container bg-white/5 p-4 rounded-md mb-3"
            >
              <div className="h-4 w-3/4 bg-white/10 rounded-md mb-2"></div>
              <div className="flex gap-[10px]">
                <div className="h-3 w-20 bg-white/10 rounded-md"></div>
                <div className="h-3 w-32 bg-white/10 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
    
     
    );
  };
  
  export default FolderListSkelaton;
  