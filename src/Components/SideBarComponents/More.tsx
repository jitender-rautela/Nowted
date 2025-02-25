import { NavLink, useLocation } from "react-router-dom";

function More() {
  const location = useLocation();
  const isFavoritesFolderList = location.pathname.includes("/favorites");
  const isArchivesFolderList = location.pathname.includes("/archives");
  const isTrashFolderList = location.pathname.includes("/trash");

  return (
    <div className="sidebar-subcontainer h-[156px]">
      <span className="sidebar-heading"> More</span>

      <NavLink to={"/favorites"} key={"favorites"}>
        <div
          className={`flex flex-col gap-1 w-full h-full transition rounded-md 
          ${isFavoritesFolderList ? "bg-white/5" : "hover:bg-white/5"}`}
        >
          <div className="file-item">
            <img
              src="../src/assets/favorites.svg"
              alt="file img"
              className="w-6 h-6"
            />
            <span className="file-text">Favorites</span>
          </div>
        </div>
      </NavLink>

      <NavLink to={`/trash`} key={"trash"}>
        <div
          className={`flex flex-col gap-1 w-full h-full transition rounded-md 
          ${isTrashFolderList ? "bg-white/5" : "hover:bg-white/5"}`}
        >
          <div className="file-item">
            <img
              src="../src/assets/trash.svg"
              alt="file img"
              className="w-6 h-6"
            />
            <span className="file-text">Trash</span>
          </div>
        </div>
      </NavLink>

      <NavLink to={"/archives"} key={"archives"}>
        <div
          className={`flex flex-col gap-1 w-full h-full transition rounded-md 
          ${isArchivesFolderList ? "bg-white/5" : "hover:bg-white/5"}`}
        >
          <div className="file-item">
            <img
              src="../src/assets/archived.svg"
              alt="file img"
              className="w-6 h-6"
            />
            <span className="file-text">Archived Notes</span>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default More;
