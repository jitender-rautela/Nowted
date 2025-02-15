
function NoteOption(){
    return (
        <div className="w-[202px] h-[155px] rounded-md p-[15px] flex flex-col gap-[20px] bg-[#333333]">
            <div className="flex gap-[15px]">
                <img src="../src/assets/favorites.svg" alt="favorite_icon" />
                <span className="font-[Source Sans Pro] font-normal text-white text-[16px] leading-[20.11px] tracking-normal">Add to favorites</span>
            </div>
            <div className="flex gap-[15px]" >
                <img src="../src/assets/archived.svg" alt="favorite_icon" />
                <span className="font-[Source Sans Pro] font-normal text-white text-[16px] leading-[20.11px] tracking-normal">Archived</span>
            </div>
            <hr className="h-[1px] bg-white/5 border-none"/>
            <div className="flex gap-[15px]">
                <img src="../src/assets/trash.svg" alt="favorite_icon" />
                <span className="font-[Source Sans Pro] font-normal text-white text-[16px] leading-[20.11px] tracking-normal">Delete</span>
            </div>
        </div>
    )

}

export default NoteOption