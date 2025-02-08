// app/detail/[package]/page.tsx
import { GoogleTrends } from '@/components/package-detail/goolgle-trends';
import { GoogleSearchResults } from '@/components/package-detail/google-search-results';
import Markdown from '@/components/package-detail/mark-down';
import { DetailPackageWrapper } from '@/components/package-detail/package-introduce';
import { getPackageDetail } from '@/app/api/npm';
import { Suspense } from 'react';
interface PageProps {
  params: {
    package: string;
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const initialResults = await getPackageDetail(params.package);
  return (
    <div className="flex">
      <div className="flex flex-col ml-48 w-auto">
        {/* 패키지 헤더 정보 영역 */}

        <DetailPackageWrapper initialResults={initialResults} />

        {/* Weekly download 현황 그래프 */}
        <div className="p-4">{/* Weekly download 컴포넌트 */}</div>

        {/* Google Trends 영역 */}
        <div>
          <Suspense fallback={<div>Loading trends...</div>}>
            <GoogleTrends packageName={params.package} />
          </Suspense>
        </div>

        {/* markdown 영역 */}
        <div className="mt-4">
          <Suspense fallback={<div>Loading markdown...</div>}>
            <Markdown packageName={params.package} />
          </Suspense>
        </div>
      </div>

      {/* 추가 정보 영역 */}
      <div className="ml-5">
        <Suspense fallback={<div>Loading search results...</div>}>
          <GoogleSearchResults packageName={params.package} />
        </Suspense>
      </div>
    </div>
  );
}
