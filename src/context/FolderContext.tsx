import { ReactNode, createContext, useContext, useState } from "react";

interface Folder {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

interface Note {
  id: string;
  folderId: string;
  title: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  preview: string;
  folder: Folder;
}

interface FolderProviderProps {
  children: ReactNode;
}

interface FolderContextType {
  folderList: Note[];
  setFolderList: React.Dispatch<React.SetStateAction<Note[]>>;
  selectedFolderName: string;
  setSelectedFolderName: React.Dispatch<React.SetStateAction<string>>;
}

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export function FolderProvider({ children }: FolderProviderProps) {
  const [folderList, setFolderList] = useState<Note[]>([]);
  const [selectedFolderName, setSelectedFolderName] = useState<string>("");

  return (
    <FolderContext.Provider
      value={{
        folderList,
        setFolderList,
        selectedFolderName,
        setSelectedFolderName,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
}
