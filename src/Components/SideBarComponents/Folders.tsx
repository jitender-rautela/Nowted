import "../../index.css";
import React, { useEffect, useState } from "react";
import {
  useFolders,
  useApiRequest,
  NavLink,
  useNavigate,
  useParams,
  FoldersResponseInterface,
} from "../../index.tsx";


function Folders() {
  const [addFolder, setAddFolder] = useState(false);
  const [folderName, setFolderName] = useState("My New Folder");
  const [newFolderName, setNewFolderName] = useState("");
  const [renamingFolderId, setRenamingFolderId] = useState<string | null>(null);

  const { setSelectedFolderName } = useFolders();
  const { folderId } = useParams();
  const navigate = useNavigate();

  const { callApi: createFolder } = useApiRequest();
  const { callApi: patchFolder } = useApiRequest();
  const {
    data: fetchFolderData,
    loading: fetchFolderLoading,
    error: fetchFolderError,
    callApi: fetchFolders,
  } = useApiRequest<FoldersResponseInterface>();

  // Handle Folder Creation
  const handleAddFolder = () => setAddFolder(true);

  const handleEnter = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>
  ) => {
    if ("key" in e && e.key !== "Enter") return;

    await createFolder("/folders", "POST", { name: folderName });
    await fetchFolders("/folders", "GET", {});
    console.log("folder created..");

    setAddFolder(false);
  };

  const handleDelete = async (id: string) => {
    await patchFolder(`/folders/${id}`, "DELETE");
    await fetchFolders("/folders", "GET");
    navigate("/");
  };

  const handleRename = async (id: string) => {
    if (!newFolderName.trim()) return;
    await patchFolder(`/folders/${id}`, "PATCH", { name: newFolderName });
    setRenamingFolderId(null); // Exit rename mode after updating
    await fetchFolders("/folders", "GET");
  };

  // Fetch All the folders on mount and whenever addFolder changes
  useEffect(() => {
    (async () => {
      try {
        await fetchFolders("/folders", "GET", {});
      } catch (error) {
        console.log(error);
      }
    })();
  }, [addFolder]);

  // Relocate to first folder by default
  useEffect(() => {
    if (fetchFolderData?.folders && fetchFolderData.folders.length > 0) {
      if (!folderId) {
        const firstFolder = fetchFolderData.folders[0];
        setSelectedFolderName(firstFolder.name);
        navigate(`/folders/${firstFolder.id}`);
      } else {
        const foundFolder = fetchFolderData.folders.find(
          (f) => f.id === folderId
        );
        if (foundFolder) {
          setSelectedFolderName(foundFolder.name);
        }
      }
    }
  }, [fetchFolderData, folderId, navigate]);

  return (
    <div className="sidebar-subcontainer h-[295px] pr-[40px]">
      <div className="flex justify-between h-[20px]">
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
              className="w-[166px] h-[22px] border border-white/40 p-1 font-semibold text-white text-[16px] leading-[20.11px] tracking-normal outline-none focus:border-white bg-white/5"
              onChange={(e) => setFolderName(e.target.value)}
              onKeyDown={handleEnter}
              onBlur={handleEnter}
            />
          </div>
        )}
        {fetchFolderLoading && <p className="text-white">Loading....</p>}
        {fetchFolderError && <p className="text-white">Error Loading data</p>}

        {fetchFolderData?.folders?.map((folder) => (
          <div
            className={`file-item group flex justify-between items-center hover:bg-white/5 ${
              folder.id === folderId ? "bg-white/5" : ""
            }`}
            key={folder.id}
            onClick={() => setSelectedFolderName(folder.name)}
            onDoubleClick={() => {
              setRenamingFolderId(folder.id);
              setNewFolderName(folder.name);
            }}
          >
            <NavLink key={folder.id} to={`/folders/${folder.id}`} className="w-[90%]">
              <div className="flex items-center gap-4 p-1">
                <img
                  className={`w-6 h-6 ${
                    folder.id === folderId ? "hidden" : "group-hover:hidden"
                  }`}
                  src="../src/assets/folder-close.svg"
                  alt="folder img"
                />
                <img
                  className={`w-6 h-6 ${
                    folder.id === folderId
                      ? "block"
                      : "hidden group-hover:block"
                  }`}
                  src="../src/assets/folder.svg"
                  alt="folder img"
                />

                {renamingFolderId === folder.id ? (
                  <input
                    type="text"
                    value={newFolderName}
                    autoFocus
                    className="w-[166px] h-[22px] border border-white/40 p-1 font-semibold text-white text-[16px] leading-[20.11px] tracking-normal outline-none focus:border-white bg-white/5"
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRename(folder.id);
                    }}
                    onBlur={() => handleRename(folder.id)}
                  />
                ) : (
                  <span
                    className={`file-text ${
                      folder.id === folderId
                        ? "text-white"
                        : "group-hover:text-white"
                    }`}
                  >
                    {folder.name}
                  </span>
                )}
              </div>
            </NavLink>

            <img
              src="../src/assets/delete.svg"
              alt="trash icon"
              className="cursor-pointer opacity-50 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(folder.id);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Folders;
