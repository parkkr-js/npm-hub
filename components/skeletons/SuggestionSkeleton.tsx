// components/skeletons/SuggestionSkeleton.tsx
export function SuggestionSkeleton() {
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-surface-high border border-surface-medium rounded-3xl shadow-lg overflow-hidden">
      <div className="max-h-[480px] p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="h-5 bg-gray-700 rounded w-40" />
                  <div className="h-4 bg-gray-700 rounded w-24" />
                </div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mt-2" />
              </div>
              <div className="text-right">
                <div className="h-4 bg-gray-700 rounded w-32" />
                <div className="h-4 bg-gray-700 rounded w-24 mt-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
