// components/search-results/SearchResultList.tsx

import { memo } from 'react';
import { SearchResultItem } from './SearchResultItem';
import { AnimatePresence, motion } from 'framer-motion';
import type { SearchResultPackageInfo } from '@/types/package';

interface SearchResultListProps {
  results: SearchResultPackageInfo[];
}

export const SearchResultList = memo(function SearchResultList({ results }: SearchResultListProps) {
  return (
    <div
      className="space-y-4 h-[calc(100vh-2rem)] overflow-y-auto pr-4"
      data-testid="search-results"
    >
      <AnimatePresence mode="popLayout">
        {results.map((result) => (
          <motion.div
            key={result.package.name}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <SearchResultItem result={result} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});
