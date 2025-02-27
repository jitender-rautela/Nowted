import { NavLink, useLocation } from "react-router-dom";
import favoritesIcon from "../../assets/favorites.svg";
import trashIcon from "../../assets/trash.svg";
import archivedIcon from "../../assets/archived.svg";

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
          ${isFavoritesFolderList ? "theme-bg-faded" : "hover:theme-bg-faded"}`}
        >
          <div className="file-item">
            <img src={favoritesIcon} alt="file img" className="w-6 h-6" />
            <span className="file-text">Favorites</span>
          </div>
        </div>
      </NavLink>

      <NavLink to={`/trash`} key={"trash"}>
        <div
          className={`flex flex-col gap-1 w-full h-full transition rounded-md 
          ${isTrashFolderList ? "theme-bg-faded" : "hover:theme-bg-faded"}`}
        >
          <div className="file-item">
            <img src={trashIcon} alt="file img" className="w-6 h-6" />
            <span className="file-text">Trash</span>
          </div>
        </div>
      </NavLink>

      <NavLink to={"/archives"} key={"archives"}>
        <div
          className={`flex flex-col gap-1 w-full h-full transition rounded-md 
          ${isArchivesFolderList ? "theme-bg-faded" : "hover:theme-bg-faded"}`}
        >
          <div className="file-item">
            <img src={archivedIcon} alt="file img" className="w-6 h-6" />
            <span className="file-text">Archived Notes</span>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default More;
