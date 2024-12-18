export function PackageCardSkeleton({ count = 4 }: { count: number }) {
  return (
    <div className="flex space-x-4 pb-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className="w-[300px] flex-none p-6 rounded-lg bg-secondary-90/50 animate-pulse"
        >
          <div className="h-6 bg-secondary-80 rounded w-3/4 mb-2" />
          <div className="h-4 bg-secondary-80 rounded w-1/4 mb-4" />
          <div className="space-y-2">
            <div className="h-4 bg-secondary-80 rounded" />
            <div className="h-4 bg-secondary-80 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}
