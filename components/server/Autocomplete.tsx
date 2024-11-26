import React from 'react';
import { autocompletePackageInfoWithBadgesInfo } from '@/types/package';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
export default function Autocomplete({
  packages,
}: {
  packages: autocompletePackageInfoWithBadgesInfo[];
}) {
  if (!packages.length) return null;
  const Badge = ({
    children,
    color,
  }: {
    children: React.ReactNode;
    color: 'badge1' | 'badge2' | 'badge3' | 'badge4';
  }) => {
    const badgeStyles = {
      badge1: 'border-badge-badge1 text-badge-badge1',
      badge2: 'border-badge-badge2 text-badge-badge2',
      badge3: 'border-badge-badge3 text-badge-badge3',
      badge4: 'border-badge-badge4 text-badge-badge4 ',
    };

    return (
      <span
        className={`ml-2 w-auto pt-1 h-6 px-2 text-xs rounded-2xl border ${badgeStyles[color]}`}
      >
        {children}
      </span>
    );
  };
  return (
    <div className="w-auto border-2 bg-surface-high border border-surface-medium rounded-3xl shadow-lg mt-1 overflow-hidden z-50">
      <div className="max-h-[480px] overflow-y-auto">
        {packages.map((pkg) => (
          <div
            key={pkg.package.name}
            className="border-b-2 border-surface-medium last:border-none hover:bg-surface-hover cursor-pointer"
          >
            <div className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-primary-50 font-medium">{pkg.package.name}</span>
                    {pkg.badges.isExactMatch && <Badge color="badge4">exact match</Badge>}
                    {pkg.badges.isMostDownloaded && <Badge color="badge1">most downloads</Badge>}
                    {pkg.badges.isMostRecent && <Badge color="badge2">most recent</Badge>}
                    {pkg.badges.isMostPopular && <Badge color="badge3">most popular</Badge>}
                  </div>
                  <p className="text-surface-white text-sm">{pkg.package.description}</p>
                </div>
                <div className="flex flex-col items-end whitespace-nowrap">
                  <span className="text-surface-disabled text-sm">Downloads / week</span>
                  <span
                    className={`font-medium ${pkg.badges.isMostDownloaded ? 'text-badge-badge1' : 'text-surface-medium'}`}
                  >
                    {pkg.package.downloadCount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
