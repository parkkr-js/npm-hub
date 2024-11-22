/**
 * 병희야 여기를 봤다면 나에게 전화를 해서 인증을 하렴...에어비엔비에서 key={i} 에러 이유 => 배열의 인덱스를 key로 사용하면 React의 재조정(reconciliation) 과정에서 문제가 발생할 수 있다는 경고.
하지만 이 경우는 스켈레톤 UI의 정적인 placeholder이고, 항목들이 변경/삭제되지 않으므로 인덱스를 key로 사용해도 ㄱㅊ.
 */

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
