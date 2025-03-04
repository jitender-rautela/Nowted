import { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import{More, Recents, Folders, useApiRequest, NoteResponseInterface, useFolders} from '../../index.tsx';
import { toast } from "react-toastify";
import logoIcon from "../../assets/logo.svg";
import searchIcon from "../../assets/search.svg";
import newNoteIcon from "../../assets/new.svg";


function SideBar() {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const {setSelectedFolderName} = useFolders()
  const [search, setSearch] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const {
    loading: postNoteLoading,
    error: postNoteError,
    callApi: postNote,
  } = useApiRequest<{id:string}>();

  const {
    data: searchNoteData,
    loading: searchNoteLoading,
    error: searchNoteError,
    callApi: searchNote,
  } = useApiRequest<NoteResponseInterface>();

  const toggleSearch = () => setSearch((prev) => !prev);

  const handleCreateNote = async () => {
    if (!folderId) return;
    const response = await postNote("/notes", "POST", {
      folderId,
      title: "Untitled Note",
      content: "Click to edit ...",
      isFavorite: false,
      isArchived: false,
    });

    if (response?.id) {
      toast.success("New note created");
      navigate(`/folders/${folderId}/notes/${response.id}`)
    }else{
      toast.error(postNoteError?.error||postNoteError?.message);
    }
  };

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) return;

    const delayDebounce = setTimeout(async() => {
      const response = await searchNote(`/notes?search=${searchQuery}&deleted=${false}`, "GET");

      if(!response){
        toast.error(searchNoteError?.error || searchNoteError?.message)
      }

    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);


  return (
    <div className="side-bar flex flex-col w-[300px] h-screen theme-bg-dark pt-[30px] pb-[30px] pr-[20px] pl-[20px] gap-[20px] ">
      <div className="logo-search flex justify-between items-center h-[38px] w-full">
        <img
          src={logoIcon}
          alt="logo"
          className="h-full w-[101px]"
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={toggleSearch}
          className="w-[13.33px] h-[13.33px] cursor-pointer"
        />
      </div>

      {search ? (
        <button
          onClick={handleCreateNote}
          className="new-note-field flex justify-center items-center w-full h-[40px] pl-5 pr-5 gap-2 rounded theme-bg-faded cursor-pointer hover:bg-white/10 transition"
          disabled={!folderId || postNoteLoading}
        >
          <img src={newNoteIcon} alt="New Note" className="w-5 h-5" />
          <span className="theme-text-primary font-semibold text-base">New Note</span>
        </button>
      ) : (
        <div className="relative w-full h-[40px] ">
          <div className="search-field flex items-center w-full gap-2 rounded theme-bg-faded pl-3 h-full">
            <img
              src={searchIcon}
              alt="Search icon"
              className="w-5 h-5"
            />
            <input
              type="text"
              placeholder="Search Note"
              className="bg-transparent theme-text-primary font-semibold text-base outline-none placeholder-white w-full"
              onChange={handleSearch}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>

          {isSearchFocused && searchQuery && (
            <div className="absolute left-0 w-full theme-bg-primary h-[200px] z-40 mt-2 flex flex-col gap-1 overflow-scroll hide-scrollbar">
              {searchNoteLoading ? (
                <div className="theme-text-primary p-2">Loading...</div>
              ) : (searchNoteData?.notes || []).length > 0 ? (
                searchNoteData?.notes?.map((note) => (
                  <NavLink
                  to={`/folders/${note.folder.id}/notes/${note.id}`}
                  key={note.id}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setSearch(true);
                    setSelectedFolderName(note.folder.name);
                  }}
                >
                  <div className="theme-text-primary p-2 hover:bg-white/10 cursor-pointer">
                    {note.title}
                  </div>
                </NavLink>
                ))
              ) : (
                <div className="theme-text-primary p-2">No results found</div>
              )}
            </div>
          )}
        </div>
      )}

      <Recents />
      <Folders />
      <More />
    </div>
  );
}

export default SideBar;
