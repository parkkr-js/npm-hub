'use client';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { getPublisherAvatarUrl } from '@/lib/utils';
import { PopularPackageInfo } from '@/types/package';
import Image from 'next/image';

export default function PopularPackageCarousel({ packages }: { packages: PopularPackageInfo[] }) {
  if (!packages || packages.length === 0) {
    return <div className="w-full p-4 text-center text-surface-medium">패키지 없음</div>;
  }

  const getNpmProfileUrl = (username: string) => {
    return `https://www.npmjs.com/~${username}`;
  };

  const handleProfileClick = (username: string) => {
    if (username && username !== 'Unknown') {
      window.open(getNpmProfileUrl(username), '_blank');
    }
  };

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-4 pb-4">
        {packages.map((pkg) => (
          <Card
            key={pkg.name}
            className="w-[300px] flex-none bg-secondary-90/50 border-surface-medium"
          >
            <CardHeader>
              <p className="text-lg font-semibold text-primary-40">
                {pkg.name || 'Unknown Package'}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-surface-white whitespace-normal">
                {pkg.description || 'No description available'}
              </p>
              <div className="flex items-center space-x-2">
                {(pkg.publisher?.email || pkg.author?.email) && (
                  <>
                    <Image
                      src={getPublisherAvatarUrl(pkg.publisher?.email || pkg.author?.email || '')}
                      alt={pkg.publisher?.username || pkg.author?.name || 'Unknown'}
                      width={18}
                      height={18}
                      className="rounded-full"
                      onClick={() =>
                        handleProfileClick(pkg.publisher?.username || pkg.author?.name || 'Unknown')
                      }
                    />
                    <p className="text-sm text-surface-medium">
                      {pkg.publisher?.username !== 'Unknown' ? pkg.publisher?.username : ''}
                      {pkg.publisher?.username !== 'Unknown' && pkg.author?.name !== 'Unknown'
                        ? ' · '
                        : ''}
                      {pkg.author?.name !== 'Unknown' ? pkg.author?.name : ''}
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
