import { useEffect } from 'react'
import '../../index.css'
import useApiRequest from '../../networkComponent/useApiRequest'

function Recents(){

    const{
        data: recentNotesData,
        loading: recentNotesLoading,
        error: recentNotesError,
        callApi: fetchRecentNotes,

    }= useApiRequest();

    useEffect(()=>{
        ;(async()=>{
            try {
                console.log("Fetching...")
                await fetchRecentNotes("/api/notes/recent","GET")
                console.log("done");
            } catch (error) {
                console.log(error)
                
            }
        })()

    },[])


    return (
        <div className="recents flex flex-col gap-2 w-[300px] h-[156px]">
            <span className="font-[Source Sans Pro] font-semibold text-white/60 text-[14px] leading-[17.6px] tracking-normal">
                Recents
            </span>

            <div className="flex flex-col gap-1 w-full h-full">
                {recentNotesLoading && <p className="text-white">Loading...</p>}
                {recentNotesError && <p className="text-red-500">Error loading data</p>}
                {recentNotesData?.recentNotes?.map((folder: any) => (
                    <div key={folder.id} className="file-item flex gap-[15px] cursor-pointer items-center w-full h-10 pt-2 pb-2">
                        <img src="../src/assets/file.svg" alt="file img" className="w-6 h-6" />
                        <span className="file-text font-[Source Sans Pro] font-semibold text-[14px] leading-[17.6px] tracking-normal text-white/60">
                            {folder.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Recents