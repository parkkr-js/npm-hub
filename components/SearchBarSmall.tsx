/* components/SearchBar.tsx */
import searchIcon from '@/public/images/Icon.png';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string; // initialQuery prop 추가
}
import { useRouter } from 'next/navigation';

function SearchBarSmall({ onSearch, initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery); // 초기값 설정
  const router = useRouter();
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
  // useEffect를 추가하여 initialQuery가 변경될 때 query 상태 업데이트
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  return (
    <div
      className=" w-[805px]
    flex"
    >
      <p
        className="text-primary-60
       w-[400px]
       h-[53px] 
       text-[45.628px] 
       tracking-[0.853px]
       font-semibold
       leading-[normal]
       font-made-tommy
       text-center 
       mt-[5px]
        cursor-pointer
       "
        onClick={() => router.push('/')}
      >
        MAIN LOGO
      </p>
      <div className=" flex w-full">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search for npm packages..."
          className="
  
          w-full h-[55px] bg-secondary-90 border-2 border-solid border-secondary-70  rounded-[27.5px]
        text-white/[0.38]
         font-pretendard text-[20px] 
         font-medium leading-normal
         pl-[42.6px]
         pt-[15px]
         pb-[16px]
         pr-[55px]
     
         "
        />
        <Button
          onClick={handleSearch}
          className="
          absolute
          mt-[10px]
          ml-[481px]
          cursor-pointer
              bg-transparent     // 배경 제거
    hover:bg-transparent  // 호버시 배경 제거
    p-0               // 패딩 제거
    border-none       // 테두리 제거
    shadow-none      // 그림자 제거
        "
          variant="ghost" // 기본버튼 스타일 제거
        >
          <Image
            src={searchIcon} // 돋보기 이미지 경로
            alt="Search"
            width={21}
            height={21.113}
            className="pointer-events-none" // 이미지의 기본 이벤트 제거
          />
        </Button>
      </div>
    </div>
  );
}

export default SearchBarSmall;
