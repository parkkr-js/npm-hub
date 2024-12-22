// types/google-trends-api.d.ts

// 모듈 선언 추가
declare module 'google-trends-api' {
  export interface TrendsOptions {
    keyword: string | string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    hl?: string;
    timezone?: number;
    category?: number;
    granularTimeResolution?: boolean;
  }

  export interface TrendsResults {
    default: {
      timelineData?: Array<{
        time: string;
        formattedTime: string;
        formattedAxisTime: string;
        value: number[];
        formattedValue: string[];
      }>;
      rankedList?: Array<{
        rankedKeyword: Array<{
          topic?: {
            mid: string;
            title: string;
            type: string;
          };
          query?: string;
          value: number;
          formattedValue: string;
          link?: string;
        }>;
      }>;
    };
  }

  export function interestOverTime(options: TrendsOptions): Promise<string>;
  export function relatedTopics(options: TrendsOptions): Promise<string>;
  export function relatedQueries(options: TrendsOptions): Promise<string>;

  const googleTrends: {
    interestOverTime: typeof interestOverTime;
    relatedTopics: typeof relatedTopics;
    relatedQueries: typeof relatedQueries;
  };

  export default googleTrends;
}
