export default function Loading() {
  return (
    <div className="absolute top-6/12 left-6/12 -translate-x-6/12 -translate-y-6/12">
      <div className="flex gap-1 items-center animate-pulse">
        <span className="text-2xl font-bold bg-amber-500 py-1 px-2 rounded-lg">
          IMDb
        </span>
        <span className="text-xl hidden sm:inline">Clone</span>
      </div>
    </div>
  );
}
