// components/search-results/SearchResultList.tsx
'use client';
import { memo } from 'react';
import { SearchResultItem } from './SearchResultItem';
import { AnimatePresence, motion } from 'framer-motion';
import type { SearchResultPackageInfo } from '@/types/package';

interface SearchResultListProps {
  results: SearchResultPackageInfo[];
}

export const SearchResultList = memo(function SearchResultList({ results }: SearchResultListProps) {
  return (
    <AnimatePresence mode="popLayout">
      {results.map((result) => (
        <motion.div
          key={`${result.package.name} - ${result.package.version}`}
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
  );
});
