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
    content?:string;
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

  export interface NoteResponseInterface {
    notes : NoteInterface[];
  }

  export interface NoteIdResponseInterface {
    note: NoteInterface;
  }

  export interface RecentResponseInterface{
    recentNotes: NoteInterface[];
  }

  export interface PatchNoteInterface {
    folderId: string;
    title?: string;
    content?: string;
    isFavorite?: boolean;
    isArchived?: boolean;
  }

 