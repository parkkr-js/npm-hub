import { getPopularPackages } from '@/app/api/npm';
import PackageCarousel from '@/components/popular-packages/PopularPackageCarousel';

export default async function PopularPackages() {
  try {
    const packages = await getPopularPackages();
    return <PackageCarousel packages={packages} />;
  } catch (error) {
    return <div>인기 패키지 로드 실패</div>;
  }
}
