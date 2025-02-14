
function Note(){

    return(
        <div className="w-full h-[1024px] flex flex-col justify-center items-center  gap-[10px]">
            <img src="../src/assets/document.svg" alt="document img" />
            <p className="text-white font-[Source Sans Pro] font-semibold text-[28px] leading-[35.2px] tracking-normal">Select a not to view</p>
            <p className="text-white text-center w-[460px] font-[Source Sans Pro] font-normal text-white/60 text-[16px]leading-[26px] tracking-normal">choose a note from the list on the left to view its contents, or create a new note to add to your collection.</p>
            
        </div>
    )

}

export default Note