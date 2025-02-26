const ActiveNoteSkelaton = () => {
  return (
    <div className="flex flex-col gap-8 p-12 w-full h-[1024px]">
      {/* Skeleton Note Header */}
      <div className="flex justify-between w-[690px] h-[40px]">
        <div className="w-2/3 h-8 bg-white/5 animate-pulse rounded"></div>
        <div className="w-8 h-8 bg-white/5 animate-pulse rounded"></div>
      </div>

      {/* Skeleton Note Metadata */}
      <div className="w-[690px] flex flex-col gap-4">
        <div className="flex gap-6">
          <div className="flex gap-4 items-center">
            <div className="w-6 h-6 bg-white/5 animate-pulse rounded"></div>
            <div className="w-20 h-4 bg-white/5 animate-pulse rounded"></div>
          </div>
          <div className="w-32 h-4 bg-white/5 animate-pulse rounded"></div>
        </div>
        <hr className="bg-white/5 h-[1px] border-none" />
        <div className="flex gap-6">
          <div className="flex gap-4 items-center">
            <div className="w-6 h-6 bg-white/5 animate-pulse rounded"></div>
            <div className="w-20 h-4 bg-white/5 animate-pulse rounded"></div>
          </div>
          <div className="w-32 h-4 bg-white/5 animate-pulse rounded"></div>
        </div>
      </div>

      {/* Skeleton Note Content */}
      <div className="w-[690px] h-[700px] flex flex-col gap-4">
        {Array(10)
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="w-full h-6 bg-white/5 animate-pulse rounded"
            ></div>
          ))}
      </div>
    </div>
  );
};

export default ActiveNoteSkelaton;
