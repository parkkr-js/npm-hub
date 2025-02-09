// components/skeletons/SuggestionSkeleton.tsx
export function SuggestionSkeleton() {
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-secondary-90 border border-surface-medium animate-pulse rounded-3xl shadow-lg overflow-hidden">
      <div className="max-h-[480px] space-y-4">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="animate-pulse p-4 border-b border-surface-medium">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="h-5 bg-secondary-80  rounded w-40" />
                  <div className="h-4 bg-secondary-80 rounded w-24" />
                </div>
                <div className="h-4 bg-secondary-80  rounded w-3/4 mt-2" />
              </div>
              <div className="text-right">
                <div className="h-4 bg-secondary-80 rounded w-32" />
                <div className="h-4 bg-secondary-80 rounded w-24 mt-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
