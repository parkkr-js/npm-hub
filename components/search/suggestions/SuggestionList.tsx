// components/search/suggestions/SuggestionList.tsx
'use client';

import { useRecoilValue } from 'recoil';
import { filteredSuggestionsSelector } from '@/store/selectors';
import SuggestionItem from './SuggestionItem';

export default function SuggestionList() {
  const suggestions = useRecoilValue(filteredSuggestionsSelector);

  if (!suggestions.length) return null;

  return (
    <div
      className="z-10 absolute top-full left-0 right-0 mt-2 bg-surface-high border border-surface-medium rounded-3xl shadow-lg overflow-hidden
    "
    >
      <div className="max-h-[480px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {suggestions.map((suggestion) => (
          <SuggestionItem key={suggestion.package.name} suggestion={suggestion} />
        ))}
      </div>
    </div>
  );
}
