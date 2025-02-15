function Folder() {
  return (
    <div
      className="w-[350px] h-[1024px] bg-[#1C1C1C] flex flex-col gap-[30px] pt-[30px] pr-[20px] pl-[20px]"
    >
        <span className="font-[Source Sans Pro] font-semibold text-[22px] leading-[27.65px] tracking-normal text-white">Personal</span>

        <div className="w-full h-[862px] flex flex-col gap-[20px]  ">
            <div className="h-[98px] w-[310px] bg-white/5 rounded-[3px] gap-[10px] p-[20px] cursor-pointer">
                <span className="font-[Source Sans Pro] font-medium text-[18px] leading-[28px] tracking-normal text-white">My Goals for the Next Year</span>
                <div className="flex gap-[10px]">
                    <span className="font-[Source Sans Pro] font-normal text-[16px] leading-[20.11px] tracking-normal text-white/60">31/02/2022</span>

                <span className="font-[Source Sans Pro] font-normal text-[16px] leading-[20.11px] tracking-normal text-white/60">As the year comes to a </span>
                </div>
            </div>

            <div className="h-[98px] w-[310px] bg-white/5 rounded-[3px] gap-[10px] p-[20px] cursor-pointer">
                <span className="font-[Source Sans Pro] font-medium text-[18px] leading-[28px] tracking-normal text-white">My Goals for the Next Year</span>
                <div>

                <span className="font-[Source Sans Pro] font-normal text-[16px] leading-[20.11px] tracking-normal text-white/60">Lorem ipsum dolor sit amet.</span>
                </div>
            </div>
        </div>

    </div>
  );
}

export default Folder;
