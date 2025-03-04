import { createContext, useContext, ReactNode, useState } from "react";

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
  content:string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  preview?: string;
  folder: Folder;
}

interface NoteProviderProps {
  children: ReactNode;
}

interface NoteContextType {
  selectedNote: Note | undefined;
  setSelectedNote: React.Dispatch<React.SetStateAction<Note | undefined>>;
}

const SelectedNoteContext = createContext<NoteContextType | undefined>(undefined);

export function NoteProvider({ children }: NoteProviderProps) {
  const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);

  return (
    <SelectedNoteContext.Provider value={{ selectedNote, setSelectedNote }}>
      {children}
    </SelectedNoteContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(SelectedNoteContext);
  if (!context) {
    throw new Error("useNotes must be used within a NoteProvider");
  }
  return context;
}
