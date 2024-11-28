// components/search-results/Keywords.tsx

import { useState } from 'react';

interface KeywordsProps {
  keywords: string[];
  limit?: number;
}

export function Keywords({ keywords, limit = 5 }: KeywordsProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedKeywords = showAll ? keywords : keywords.slice(0, limit);
  const remaining = keywords.length - limit;

  return (
    <div className="flex flex-wrap gap-2">
      {displayedKeywords.map((keyword) => (
        <span
          key={keyword}
          className="px-2 py-1 text-xs rounded-full bg-secondary-80 text-surface-white"
        >
          {keyword}
        </span>
      ))}
      {!showAll && remaining > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className="px-2 py-1 text-xs rounded-full bg-secondary-70 text-surface-white hover:bg-secondary-60"
        >
          +{remaining}
        </button>
      )}
      {showAll && (
        <button
          onClick={() => setShowAll(false)}
          className="px-2 py-1 text-xs text-surface-medium hover:text-surface-white"
        >
          Show less
        </button>
      )}
    </div>
  );
}
