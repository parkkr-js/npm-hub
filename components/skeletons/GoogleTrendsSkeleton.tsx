// components/skeletons/GoogleTrendsSkeleton.tsx
export function GoogleTrendsSkeleton() {
  return (
    <div className="p-4 max-w-6xl mx-auto animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />

      <div className="p-6 mb-6 bg-white rounded-lg shadow">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-2" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <div className="h-[400px] bg-gray-100 rounded" />
        <div className="mt-4 flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
      </div>
    </div>
  );
}
