// types/google-search.ts

// API 응답의 아이템 타입
interface GoogleSearchItem {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
  pagemap?: {
    cse_thumbnail?: Array<{
      src: string;
      width: string;
      height: string;
    }>;
    metatags?: Array<{
      'article:published_time'?: string;
      [key: string]: string | undefined;
    }>;
  };
}

// API 응답 전체 타입
interface GoogleSearchResponse {
  items: GoogleSearchItem[];
  searchInformation?: {
    totalResults: string;
    searchTime: number;
  };
}

// 컴포넌트에서 사용할 가공된 검색 결과 타입
export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
  thumbnail?: {
    src: string;
    width: number;
    height: number;
  } | null;
  datePublished?: string | null;
}

export interface SearchResultsProps {
  packageName: string;
}
