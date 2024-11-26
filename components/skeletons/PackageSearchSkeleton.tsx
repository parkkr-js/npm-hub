export function PackageLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-14 bg-[#1a1a1a] rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-48 bg-[#1a1a1a] rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}
