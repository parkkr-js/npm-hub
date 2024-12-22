// app/detail/[package]/page.tsx
import { GoogleTrends } from '@/components/package-detail/goolgle-trends';

interface PageProps {
  params: {
    package: string;
  };
}

export default function PackageDetailPage({ params }: PageProps) {
  return (
    <div>
      {/* 패키지 헤더 정보 영역 */}
      <div className="bg-gray-100 p-4">
        <h1 className="text-2xl font-bold">{params.package}</h1>
      </div>

      {/* Weekly download 현황 그래프 */}
      <div className="p-4">{/* Weekly download 컴포넌트 */}</div>

      {/* Google Trends 영역 */}
      <div className="p-4">
        <GoogleTrends packageName={params.package} />
      </div>

      {/* 추가 정보 영역 */}
      <div className="p-4">{/* 부가 정보 컴포넌트들 */}</div>
    </div>
  );
}
