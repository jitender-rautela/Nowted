import "../../index.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const istrashFolderList = location.pathname.includes("/trash");
  const isFavoritesFolderList = location.pathname.includes("/favorites");
  const isArchivesFolderList = location.pathname.includes("/archives");

  const { setSelectedFolderName } = useFolders();
  const { folderId } = useParams();
  const navigate = useNavigate();

  const { error: createFolderError, callApi: createFolder } =
    useApiRequest<string>();
  const { callApi: patchFolder } = useApiRequest<string>();
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
    setAddFolder(false);

    const response = await createFolder("/folders", "POST", {
      name: folderName,
    });

    if (response) {
      await fetchFolders("/folders", "GET", {});
      toast.success(response);
      setFolderName("My New Folder");
    } else {
      toast.error(createFolderError?.message || "Failed to create folder.");
    }
  };

  const handleDelete = async (id: string) => {
    const response = await patchFolder(`/folders/${id}`, "DELETE");

    if (response) {
      await fetchFolders("/folders", "GET");
      navigate("/");
      toast.success("Folder deleted successfully");
    } else {
      toast.error("Failed to delete folder");
    }
  };

  const handleRename = async (id: string) => {
    if (!newFolderName.trim()) return;
    const response = await patchFolder(`/folders/${id}`, "PATCH", {
      name: newFolderName,
    });

    if (response) {
      setRenamingFolderId(null);
      await fetchFolders("/folders", "GET");
      toast.success(response);
    } else {
      toast.error("Unable to Rename");
    }
  };

  // Fetch All the folders on mount and whenever addFolder changes
  useEffect(() => {
    if (addFolder) return;
    (async () => {
      const response = await fetchFolders("/folders", "GET", {});
      if(!response){
        toast.error(fetchFolderError?.error||fetchFolderError?.message)
      }
    })();
  }, [addFolder]);

  // Relocate to first folder by default
  useEffect(() => {
    if (istrashFolderList) {
      setSelectedFolderName("Trash");
      return;
    } else if (isFavoritesFolderList) {
      setSelectedFolderName("Favorites");
      return;
    } else if (isArchivesFolderList) {
      setSelectedFolderName("Archives");
      return;
    }

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
              className="w-[166px] h-[22px] border border-white/40 p-1 font-semibold text-white text-[16px] leading-[20.11px] tracking-normal outline-none focus:border-none bg-transparent"
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
            <NavLink
              key={folder.id}
              to={`/folders/${folder.id}`}
              className="w-[90%]"
            >
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
