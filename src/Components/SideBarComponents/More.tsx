import { NavLink} from "react-router-dom";

function More() {
  return (
    <div className="sidebar-subcontainer h-[156px]">
      <span className="sidebar-heading"> More</span>

      <NavLink to={"/favorites"} key={"favorites"}>
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
      </NavLink>

      <NavLink to={`/trash`} key={"trash"} className="flex flex-col gap-1 w-full h-full ">
        <div>
          <div className="file-item">
            <img
              src="../src/assets/trash.svg"
              alt="file img"
              className="w-6 h-6"
            />
            <span className="file-text ">Trash</span>
          </div>
        </div>
      </NavLink>

      <NavLink to={"/archived"} key={"archived"}>
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
      </NavLink>
    </div>
  );
}

export default More;
