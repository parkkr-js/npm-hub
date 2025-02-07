'use client';
// components/search/suggestions/SuggestionItem.tsx

import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import type { SuggestionPackageInfo } from '@/types/package';
import { useResetRecoilState } from 'recoil';
import { searchQueryAtom } from '@/store/atoms';
import { slashEncoding } from '@/lib/utils';
interface SuggestionItemProps {
  suggestion: SuggestionPackageInfo;
}

export default function SuggestionItem({ suggestion }: SuggestionItemProps) {
  const resetSearchQuery = useResetRecoilState(searchQueryAtom);
  return (
    <div className="p-4  border-b border-surface-medium last:border-0">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 ">
            <Link
              href={`/detail/${slashEncoding(suggestion.package.name)}`}
              className="hover:bg-surface-hover cursor-pointer text-primary-50 text-lg font-medium"
              onClick={resetSearchQuery}
            >
              {suggestion.package.name}
            </Link>
            {suggestion.badges?.isExactMatch && <Badge variant="exactMatch">exact match</Badge>}
            {suggestion.badges?.isMostDownloaded && (
              <Badge variant="downloads">most downloads</Badge>
            )}
            {suggestion.badges?.isMostRecent && <Badge variant="recent">most recent</Badge>}
            {suggestion.badges?.isMostPopular && <Badge variant="popular">most popular</Badge>}
          </div>
          <p className="text-surface-white text-sm mt-1">{suggestion.package.description}</p>
        </div>
        <div className="text-right whitespace-nowrap">
          <span className="text-surface-disabled text-sm">Downloads / week</span>
          <span
            className={`block font-medium ${
              suggestion.badges?.isMostDownloaded ? 'text-alert-red' : 'text-surface-white'
            }`}
          >
            {suggestion.package.downloadCount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
