import { useFolders } from "../../context/FolderContext";
import "../../index.css";
import useApiRequest from "../../networkComponent/useApiRequest";
import React, {useEffect, useState } from "react";

function Folders() {
  const [addFolder, setAddFolder] = useState(false);
  const [folderName, setFolderName] = useState("My New Folder");
  const{setFolderList,setSelectedFolderName } = useFolders()

  const {
    data: fetchFolderData,
    loading: fetchFolderLoading,
    error: fetchFolderError,
    callApi: fetchFolders,
  } = useApiRequest();

  const {
    data: fetchFolderNotesData,
    loading: fetchFolderNotesLoading,
    error: fetchFolderNotesError,
    callApi: fetchFolderNotes,
  } = useApiRequest();

  const {
    data: createFolderData,
    loading: createFolderLoading,
    error: createFolderError,
    callApi: createFolder,
  } = useApiRequest();

  useEffect(() => {
    (async () => {
      try {
        await fetchFolders("/folders", "GET");
      } catch (error) {
        console.log(error);
      }
    })();
  }, [addFolder]);

  const handleAddFolder = () => {
    setAddFolder(true);
  };

  const handleEnter = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>
  ) => {
    if ("key" in e && e.key !== "Enter") return;

    try {
      await createFolder("/folders", "POST", { name: folderName });
      console.log("folder created..");
    } catch (error) {
      console.log(error);
    }

    setAddFolder(false);
  };

  const handleFolderClick = async (e: React.MouseEvent, folderId: string, folderName:string) => {
    try {
      setSelectedFolderName(folderName)
      await fetchFolderNotes(`/notes?folderId=${folderId}`, "GET");
      console.log("Notes loaded..")      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (fetchFolderNotesData?.notes) {
      setFolderList(fetchFolderNotesData.notes);
    }
  }, [fetchFolderNotesData]);


  return (
    <div className="sidebar-subcontainer h-[295px]  pr-[40px]">
      <div className=" flex justify-between h-[20px] ">
        <span className="sidebar-heading">Folders</span>
        <img
          src="../src/assets/addfolder.svg"
          alt="add_folder_img"
          className="cursor-pointer"
          onClick={handleAddFolder}
        />
      </div>

      <div className="flex flex-col gap-1 w-full h-full overflow-scroll hide-scrollbar">
        {addFolder && (
          <div className="file-item">
            <img
              src="../src/assets/folder.svg"
              alt="file img"
              className="w-6 h-6"
            />

            <input
              type="text"
              value={folderName}
              autoFocus
              className=" w-[166px] h-[22px] border border-white/40  p-1 font-semibold text-white text-[16px] leading-[20.11px] tracking-normal outline-none focus:border-white bg-white/5 "
              onChange={(e) => {
                setFolderName(e.target.value);
              }}
              onKeyDown={handleEnter}
              onBlur={handleEnter}
            />
          </div>
        )}
        {fetchFolderLoading && <p className="text-white">Loading....</p>}
        {fetchFolderError && <p className="text-red">Error Loading data</p>}
        {fetchFolderData?.folders?.map((folder: any) => {
          return (
            <div
              className="file-item group hover:bg-white/5"
              key={folder.id}
              onClick={(event) => handleFolderClick(event, folder.id, folder.name)}
            >
              <img
                className="w-6 h-6 group-hover:hidden"
                src="../src/assets/folder-close.svg"
                alt="folder img"
              />
              <img
                className="w-6 h-6 hidden group-hover:block"
                src="../src/assets/folder.svg"
                alt="folder img"
              />
              <span className="file-text group-hover:text-white">
                {folder.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Folders;
