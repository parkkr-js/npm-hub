// compoenents/search-results/SearchResultItem.tsx
import { getTimeAgo } from '@/lib/utils';
import { getPublisherAvatarUrl } from '@/lib/utils';
import { Keywords } from '@/components/search-results/Keywords';
import { Badge } from '@/components/ui/Badge';
import { DetailResultPackageInfo } from '@/types/package';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { useRecoilValue } from 'recoil';
import { GoogletrendsAtom } from '@/store/atoms';
interface DetailPackageItemProps {
  result: DetailResultPackageInfo;
}

export function DetailPackage({ result }: DetailPackageItemProps) {
  const currentPackage = useRecoilValue(GoogletrendsAtom);
  const { package: pkg, score: score } = result;

  const handleCopy = () => {
    navigator.clipboard.writeText(`npm i ${pkg.name}`);
  };
  const stats = [
    { label: 'Version', value: pkg.version },
    { label: 'Download/week', value: pkg.downloadCount.toLocaleString() },
    { label: 'Google trend', value: currentPackage ?? '-' },
    { label: 'Score', value: Math.round(score.final * 100) },
  ];
  return (
    <div>
      <div className="flex flex-col bg-secondary-90 w-[785px] px-6 min-h-56 rounded-[20px]">
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
        <div className="flex">
          <div className=" w-[500px] flex flex-col ">
            <div className="flex items-center gap-2">
              <p className="text-4xl font-semibold text-primary-50">{pkg.name}</p>
            </div>

            <div className="flex">
              <p className="w-[450px] mt-9  text-surface-white">{pkg.description}</p>
            </div>
            <div className="mt-4 flex">
              <Keywords keywords={pkg.keywords} />
            </div>
          </div>
          <div className="flex-col ml-[6%] max-w-[170px] bg-slate-400">
            <p className="text-secondary-30 font-semibold text-base mr-4">Command</p>
            <div className="flex w-full bg-gray-200 h-10 p-2 rounded-lg bg-secondary-70 ">
              {/*<p className=" whitespace-nowrap  text-[#FFF] ">{`npm i ${pkg.name}`}</p>*/}
              <p className=" overflow-x-auto whitespace-nowrap  [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden text-[#FFF] ">{`npm i ${pkg.name}`}</p>
              <img
                onClick={handleCopy}
                src="/images/copyvector.svg"
                alt="copy"
                className="cursor-pointer w-4 h-5 mt-1 ml-1"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary-90 w-[785px] rounded-[20px] mt-4">
        <div className="grid grid-cols-4 h-10 pt-1">
          {stats.map(({ label }) => (
            <p key={label} className="text-secondary-40 text-base text-center">
              {label}
            </p>
          ))}
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="2"
          preserveAspectRatio="none"
          viewBox="0 0 100 2"
        >
          <path d="M0 1L100 1" stroke="#151617" strokeWidth="2" />
        </svg>

        <div className="grid grid-cols-4 h-16 pb-4 px-0">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="text-white text-xl overflow-hidden text-ellipsis font-medium text-center mt-4"
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
