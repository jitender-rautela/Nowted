import { useEffect, useState, useCallback } from "react";
import Recents from "./Recents.tsx";
import Folders from "./Folders.tsx";
import More from "./More.tsx";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useApiRequest from "../../hooks/useApiRequest.tsx";

function SideBar() {
  const [search, setSearch] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState(false); // Track input focus
  const navigate = useNavigate();
  const { folderId } = useParams();

  const {
    data: postNoteData,
    loading: postNoteLoading,
    error: postNoteError,
    callApi: postNote,
  } = useApiRequest();

  const {
    data: searchNoteData,
    loading: searchNoteLoading,
    error: searchNoteError,
    callApi: searchNote,
  } = useApiRequest();

  const toggleSearch = () => setSearch((prev) => !prev);

  const handleCreateNote = async () => {
    if (!folderId) return;
    await postNote("/notes", "POST", {
      folderId,
      title: "Untitled Note",
      content: "Click to edit ...",
      isFavorite: false,
      isArchived: false,
    });
    console.log("New note created");
  };

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) return;

    const delayDebounce = setTimeout(() => {
      searchNote(`/notes?search=${searchQuery}`, "GET");
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  useEffect(() => {
    if (postNoteData?.id) {
      navigate(`/folders/${folderId}/notes/${postNoteData.id}`);
    }
  }, [postNoteData, folderId, navigate]);

  return (
    <div className="side-bar flex flex-col w-[300px] h-[1024px] bg-[#181818] pt-[30px] pb-[30px] pr-[20px] pl-[20px] gap-[30px]">
      <div className="logo-search flex justify-between items-center h-[38px] w-full">
        <img
          src="../src/assets/logo.svg"
          alt="logo"
          className="h-full w-[101px]"
        />
        <img
          src="../src/assets/search.svg"
          alt="search"
          onClick={toggleSearch}
          className="w-[13.33px] h-[13.33px] cursor-pointer"
        />
      </div>

      {search ? (
        <button
          onClick={handleCreateNote}
          className="new-note-field flex justify-center items-center w-full h-[40px] pl-5 pr-5 gap-2 rounded bg-white/5 cursor-pointer hover:bg-white/10 transition"
          disabled={!folderId || postNoteLoading}
        >
          <img src="../src/assets/new.svg" alt="New Note" className="w-5 h-5" />
          <span className="text-white font-semibold text-base">New Note</span>
        </button>
      ) : (
        <div className="relative w-full">
          <div className="search-field flex items-center w-full h-[40px] gap-2 rounded bg-white/5 pl-3">
            <img
              src="../src/assets/search.svg"
              alt="Search icon"
              className="w-5 h-5"
            />
            <input
              type="text"
              placeholder="Search Note"
              className="bg-transparent text-white font-semibold text-base outline-none placeholder-white w-full"
              onChange={handleSearch}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>

          {isSearchFocused && searchQuery && (
            <div className="absolute left-0 w-full bg-[#1C1C1C] h-[200px] z-40 mt-2 flex flex-col gap-1 overflow-scroll hide-scrollbar">
              {searchNoteLoading ? (
                <div className="text-white p-2">Loading...</div>
              ) : searchNoteData?.notes?.length > 0 ? (
                searchNoteData.notes.map((note) => (
                  <NavLink
                    to={`/folders/${note.folder.id}/notes/${note.id}`}
                    key={note.id}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <div className="text-white p-2 hover:bg-white/10 cursor-pointer">
                      {note.title}
                    </div>
                  </NavLink>
                ))
              ) : (
                <div className="text-gray-400 p-2">No results found</div>
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
