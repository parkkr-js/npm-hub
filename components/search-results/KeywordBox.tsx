'use client';

// components/search-results/KeywordBox.tsx
import { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { memoizedTopKeywordsSelector } from '@/store/selectors';

export const KeywordBox = memo(function KeywordBox() {
  const topKeywords = useRecoilValue(memoizedTopKeywordsSelector);

  return (
    <div className="bg-surface-90 p-4 rounded-lg">
      <h2 className="text-lg font-medium text-surface-white mb-4">Top Keywords</h2>
      <div className="space-y-2">
        {topKeywords.map((keyword) => (
          <Keyword key={keyword} keyword={keyword} />
        ))}
      </div>
    </div>
  );
});

const Keyword = memo(function Keyword({ keyword }: { keyword: string }) {
  return (
    <div className="px-3 py-2 bg-secondary-80 rounded text-surface-white text-sm">{keyword}</div>
  );
});
