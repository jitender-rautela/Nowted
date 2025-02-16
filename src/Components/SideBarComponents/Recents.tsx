import { useEffect } from "react";
import "../../index.css";
import useApiRequest from "../../networkComponent/useApiRequest";

function Recents() {
  const {
    data: recentNotesData,
    loading: recentNotesLoading,
    error: recentNotesError,
    callApi: fetchRecentNotes,
  } = useApiRequest();

  useEffect(() => {
    (async () => {
      try {
        console.log("Fetching...");
        await fetchRecentNotes("/notes/recent", "GET");
        console.log("done");
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="sidebar-subcontainer h-[156px]">
      <span className="sidebar-heading">
        Recents
      </span>

      <div className="flex flex-col gap-1 w-full h-full">
        {/* {recentNotesLoading && <p className="text-white">Loading...</p>}
        {recentNotesError && <p className="text-red-500">Error loading data</p>} */}
        {recentNotesData?.recentNotes?.map((folder: any) => (
          <div
            key={folder.id}
            className="file-item group hover:bg-[#312EB5]"
          >
            <img
              className="w-6 h-6 group-hover:hidden"
              src="../src/assets/file.svg"
              alt="file img"
            />
            <img
              className="w-6 h-6 hidden group-hover:block"
              src="../src/assets/file-focus.svg"
              alt="file img"
            />
            <span className="file-text group-hover:text-white ">
              {folder.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recents;
