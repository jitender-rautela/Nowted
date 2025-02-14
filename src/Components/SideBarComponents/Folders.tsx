import "../../index.css";
import useApiRequest from "../../networkComponent/useApiRequest";
import { useEffect } from "react";

function Folders() {
    const {
        data: fetchFolderData,
        loading: fetchFolderLoading,
        error: fetchFolderError,
        callApi: fetchFolders,
      } = useApiRequest();

      useEffect(() => {
          (async () => {
            try {
              console.log("Fetching...");
              await fetchFolders("/folders", "GET");
              console.log("done");
            } catch (error) {
              console.log(error);
            }
          })();
        }, []);


  return (
    <div className="sidebar-subcontainer h-[295px]">
      <div className=" flex justify-between">
        <span className="sidebar-heading"> Folders</span>
        <img
          src="../src/assets/addfolder.svg"
          alt="add_folder_img"
          className="cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-1 w-full h-full overflow-scroll hide-scrollbar">
        {fetchFolderLoading && <p className="text-white">Loading....</p>}
        {fetchFolderError && <p className="text-red">Error Loading data</p>}
        {fetchFolderData?.folders?.map((folder:any)=>{
            return<div className="file-item" key={folder.id}>
            <img
              src="../src/assets/folder-close.svg"
              alt="file img"
              className="w-6 h-6"
            />
            <span className="file-text ">{folder.name}</span>
          </div>

        })}
        
        
      </div>
    </div>
  );
}

export default Folders;
