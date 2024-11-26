'use client';
import { searchPackagesWithBadgesInfo } from '@/types/package';
import { useState } from 'react';
export default function SearchResultCard({
  packageInfo,
}: {
  packageInfo: searchPackagesWithBadgesInfo[];
}) {
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

  const KeywordsList = ({ keywords }: { keywords: string[] }) => {
    const [expanded, setExpanded] = useState(false);
    const limit = 5;

    if (!keywords?.length) return null;

    const displayKeywords = expanded ? keywords : keywords.slice(0, limit);
    const remaining = keywords.length - limit;

    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {displayKeywords.map((keyword) => (
          <span key={keyword} className="px-2 py-1 bg-[#333] rounded-full text-xs text-gray-400">
            {keyword}
          </span>
        ))}
        {!expanded && remaining > 0 && (
          <button
            onClick={() => setExpanded(true)}
            className="px-2 py-1 bg-[#333] rounded-full text-xs text-gray-400 hover:bg-[#444]"
          >
            +{remaining}
          </button>
        )}
        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="px-2 py-1 bg-[#333] rounded-full text-xs text-gray-400 hover:bg-[#444]"
          >
            Show less
          </button>
        )}
      </div>
    );
  };
  return (
    <div className="w-auto mt-1 overflow-hidden z-50">
      {packageInfo.map((pkg) => (
        <div
          key={pkg.package.name}
          className="flex max-w-3xl bg-[#1a1a1a] rounded-3xl p-4 hover:bg-[#2a2a2a] mb-3 transition-colors"
        >
          <div className="flex bg-blue-200 w-96 flex-col gap-3 items-start mb-3">
            <div className="flex">
              <div className="w-auto text-xl  font-semibold  text-primary-50">
                {pkg.package.name}
              </div>

              {pkg.badges.isExactMatch && <Badge color="badge4">exact match</Badge>}
              {pkg.badges.isMostDownloaded && <Badge color="badge1">most downloads</Badge>}
              {pkg.badges.isMostRecent && <Badge color="badge2">most recent</Badge>}
              {pkg.badges.isMostPopular && <Badge color="badge3">most popular</Badge>}
            </div>
            <div className="w-auto text-font-white mt-1 line-clamp-2">
              {pkg.package.description}
            </div>
            <KeywordsList keywords={pkg.package.keywords} />
          </div>
          <div className="flex bg-blue-200 flex-col ml-60">
            <div className="text-right text-sm text-gray-400">
              <span className="text-surface-disabled text-sm">Downloads / week</span>
              <span
                className={`font-medium ${pkg.badges.isMostDownloaded ? 'text-badge-badge1' : 'text-surface-medium'}`}
              >
                {pkg.package.downloadCount.toLocaleString()}
              </span>
            </div>

            <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
              <div>Score: {Math.round(pkg.score.final * 100)}%</div>
              <div>Updated: {new Date(pkg.package.date).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
