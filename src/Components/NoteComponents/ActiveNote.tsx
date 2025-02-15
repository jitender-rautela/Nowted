import { useEffect, useRef, useState } from "react";
import NoteOption from "./NoteOption";

function ActiveNote() {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const handleNoteOption = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  });

  return (
    <div className="flex flex-col gap-[30px] p-[50px] w-full h-[1024px]">
      <div className="flex justify-between w-[690px] h-[40px]">
        <span className="font-[Source Sans Pro] font-semibold text-[32px] text-white leading-[40.22px] tracking-normal">
          Reflection on the Month of June
        </span>
        <div className="relative">
          <img
            className="w-[30px] h-[30px] cursor-pointer"
            src="../src/assets/note-option.svg"
            alt="option_img"
            onClick={handleNoteOption}
          />

          {showOptions && (
            <div ref={optionsRef} className="absolute right-0 top-10  z-50 ">
              <NoteOption />
            </div>
          )}
        </div>
      </div>

      <div className="w-[690px] h-[67px] flex flex-col gap-[15px]">
        <div className="flex gap-[70px] w-[214px] h-[18px] justify-center">
          <div className="flex gap-[20px]">
            <img src="../src/assets/calender.svg" alt="calender_img" />
            <span className="font-[Source Sans Pro] font-semibold text-white/60 text-[14px] leading-[17.6px] tracking-normal">
              Date
            </span>
          </div>
          <span className="font-[Source Sans Pro] font-semibold text-white text-[14px] leading-[17.6px] tracking-normal">
            21/06/2022
          </span>
        </div>

        <hr />

        <div className="flex gap-[70px] w-[214px] h-[18px] justify-center">
          <div className="flex gap-[20px]">
            <img src="../src/assets/folder-close.svg" alt="calender_img" />
            <span className="font-[Source Sans Pro] font-semibold text-white/60 text-[14px] leading-[17.6px] tracking-normal">
              Folder
            </span>
          </div>
          <span className="font-[Source Sans Pro] font-semibold text-white text-[14px] leading-[17.6px] tracking-normal">
            Personal
          </span>
        </div>
      </div>

      <div>
        <p className="w-[690px] h-[700px] font-[Source Sans Pro] font-normal text-[16px] text-white leading-[28px] tracking-normal">
          It's hard to believe that June is already over! Looking back on the
          month, there were a few highlights that stand out to me. One of the
          best things that happened was getting promoted at work. I've been
          working really hard and it's great to see that effort recognized. It's
          also exciting to have more responsibility and the opportunity to
          contribute to the company in a bigger way. I'm looking forward to
          taking on new challenges and learning as much as I can in my new role.
          I also had a great time on my vacation to Hawaii. The beaches were
          beautiful and I loved trying all of the different types of Hawaiian
          food. It was nice to relax and get away from the daily grind for a
          bit. I'm so grateful to have had the opportunity to take a trip like
          that. On the downside, I feel like I didn't make as much progress on
          my fitness goals as I would have liked. I was really busy with work
          and didn't make it to the gym as often as I planned. I'm going to try
          to be more consistent in July and make exercise a higher priority. I
          know it will be good for my physical and mental health. I also had a
          few rough patches in my relationships this month. I had a couple of
          misunderstandings with friends and it was hard to navigate those
          conflicts. But I'm glad we were able to talk things through and move
          past them. I value my relationships and I want to make sure I'm always
          working to be a good friend. Overall, it was a good month with a mix
          of ups and downs. I'm looking forward to what July has in store! I'm
          hoping to make some more progress on my goals and spend quality time
          with the people I care about.
        </p>
      </div>
    </div>
  );
}

export default ActiveNote;
