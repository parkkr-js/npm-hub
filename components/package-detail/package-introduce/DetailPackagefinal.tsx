// compoenents/search-results/SearchResultItem.tsx
import { getTimeAgo } from '@/lib/utils';
import { getPublisherAvatarUrl } from '@/lib/utils';
import { Keywords } from '@/components/search-results/Keywords';
import { Badge } from '@/components/ui/Badge';
import { DetailResultPackageInfo } from '@/types/package';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface DetailPackageItemProps {
  result: DetailResultPackageInfo;
}

export function DetailPackage({ result }: DetailPackageItemProps) {
  const { package: pkg, score: score } = result;
  console.log('it works3');
  //   {/*추가 설정 필요한 score 범위 못찾겟음 */}
  console.log(score);
  return (
    <div>
      <div className="bg-secondary-90 w-[785px] h-56 rounded-[20px]">
        <div className="ml-6 flex flex-col">
          <div className="mt-4 flex items-center gap-4 text-sm text-surface-medium">
            <div className="flex items-center gap-2">
              <span className="text-sm text-surface-medium">{pkg.version}</span>
              <span>•</span>
              <span>{getTimeAgo(pkg.date)}</span>
              <span>•</span>
              <Image
                src={getPublisherAvatarUrl(pkg.publisher.username)}
                alt={pkg.publisher.username}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span>{pkg.publisher.username}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-4xl font-semibold text-primary-50">{pkg.name}</p>
          </div>

          <p className="mt-9 mt-2 text-surface-white">{pkg.description}</p>

          <div className="mt-4">
            <Keywords keywords={pkg.keywords} />
          </div>
        </div>
      </div>
      <div className="bg-secondary-90 w-[785px] rounded-[20px] mt-4">
        <div className="h-10 pt-1 w-full">
          <div className="flex justify-around">
            <p className="text-secondary-40 text-base">Version</p>
            <p className="text-secondary-40 text-base">Download/week</p>
            <p className="text-secondary-40 text-base">Google trend</p>
            <p className="text-secondary-40 text-base">Score</p>
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="785"
          height="2"
          viewBox="0 0 785 2"
          fill="none"
        >
          <path d="M0 1L785 1.00007" stroke="#151617" strokeWidth="2" />
        </svg>

        <div className="h-16 pb-4 px-8">
          <div className="flex justify-between mt-4">
            <div className="text-white text-xl font-medium">{pkg.version}</div>
            <div className="text-white text-xl font-medium">
              {pkg.downloadCount.toLocaleString()}
            </div>
            <div className="text-white text-xl font-medium">{pkg.googleTrends || '-'}</div>
            <div className="text-white text-xl font-medium">
              {Math.round((score.final / 1700) * 100)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
