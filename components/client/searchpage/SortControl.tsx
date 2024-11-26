'use client';
import { useRecoilState } from 'recoil';
import { selectedSortState, Sorttype } from '@/store/atoms/search';

export default function SortControl() {
  const [sortType, setSortType] = useRecoilState(selectedSortState);

  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'downloads', label: 'Downloads' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'recent', label: 'Recent' },
  ] as const;

  return (
    <div className="bg-[#1a1a1a] rounded-lg p-4 flex items-center gap-4">
      <span className="text-gray-400">Sorting</span>
      <div className="flex gap-2">
        {sortOptions.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setSortType(value)}
            className={`px-4 py-2 rounded-md transition-colors ${
              sortType === value
                ? 'bg-blue-600 text-white'
                : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
