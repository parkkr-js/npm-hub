/* components/SearchBar.tsx */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      onSearch(trimmedQuery);
    }
    console.log('****Search for: ', trimmedQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-3xl font-bold text-center">NPM Package Search</h1>
      <div className="flex w-full max-w-lg space-x-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search for npm packages..."
          className="flex-1 p-4 text-lg border border-gray-300 rounded"
        />
        <Button
          onClick={handleSearch}
          className="px-6 py-3 text-lg font-medium"
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
