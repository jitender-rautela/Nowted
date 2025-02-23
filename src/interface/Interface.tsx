export interface FolderInterface {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  }

 export interface NoteInterface {
    id: string;
    folderId: string;
    title: string;
    isFavorite: boolean;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    preview: string;
    folder: FolderInterface;
  }

  export interface FoldersResponseInterface {
    folders: FolderInterface[];
    length: number; 
  }

  export interface RecentResponseInterface{
    recentNotes: NoteInterface[];
  }