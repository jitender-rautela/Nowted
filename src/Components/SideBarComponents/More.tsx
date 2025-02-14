
function More(){

    return(
        <div className="sidebar-subcontainer h-[156px]">
            <span className="sidebar-heading"> More</span>

            <div className="flex flex-col gap-1 w-full h-full ">
            <div className="file-item">
            <img
              src="../src/assets/favorites.svg"
              alt="file img"
              className="w-6 h-6"
            />
            <span className="file-text ">Favorites</span>
          </div>
            </div>

            <div className="flex flex-col gap-1 w-full h-full ">
            <div className="file-item">
            <img
              src="../src/assets/trash.svg"
              alt="file img"
              className="w-6 h-6"
            />
            <span className="file-text ">Trash</span>
          </div>
            </div>

            <div className="flex flex-col gap-1 w-full h-full ">
            <div className="file-item">
            <img
              src="../src/assets/archived.svg"
              alt="file img"
              className="w-6 h-6"
            />
            <span className="file-text ">Archived Notes</span>
          </div>
            </div>
            
        </div>
    )

}

export default More