const RecentNotesSkeleton = () => {
  return (
    <div className="flex flex-col gap-1 w-[300px] h-full">
      {/* Skeleton Loading Items */}
      {Array(3)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="file-item rounded-md  30 flex items-center gap-2 p-2 animate-pulse"
          >
            <div className="w-6 h-6 bg-white/5 rounded"></div>
            <div className="w-32 h-4 bg-white/5 rounded"></div>
          </div>
        ))}
    </div>
  );
};

export default RecentNotesSkeleton;
