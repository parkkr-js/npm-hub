'use client';
import { useRecoilValue } from 'recoil';
import { filteredSearchPackagesSelector } from '@/store/selectors/search';
import SortControl from './SortControl';
import ResultCard from '../../server/SearchResultCard';
import { searchPackagesWithBadgesInfo } from '@/types/package';
import SearchResultCard from '../../server/SearchResultCard';
import { PackageLoadingSkeleton } from '@/components/skeletons/PackageSearchSkeleton';

export default function SearchResultUI() {
  const packages = useRecoilValue<searchPackagesWithBadgesInfo[]>(filteredSearchPackagesSelector);

  if (packages.length === 0) {
    return <PackageLoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <SortControl />
      <SearchResultCard packageInfo={packages} />
    </div>
  );
}
