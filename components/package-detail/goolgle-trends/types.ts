// components/package-detail/google-trends/types.ts
export interface TrendData {
  interestOverTime: Array<{
    time: string;
    formattedTime: string;
    formattedAxisTime: string;
    value: number[];
    formattedValue: string[];
  }>;
  relatedTopics: Array<{
    topic: {
      mid: string;
      title: string;
      type: string;
    };
    value: number;
    formattedValue: string;
  }>;
  relatedQueries: Array<{
    query: string;
    value: number;
    formattedValue: string;
    link: string;
  }>;
}
