// types/google-trends-api.d.ts
declare module 'google-trends-api' {
  interface TrendsOptions {
    keyword: string | string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    hl?: string;
    timezone?: number;
    category?: number;
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
