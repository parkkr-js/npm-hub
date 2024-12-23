// types/google-trends.ts
export interface TimelineData {
  time: string;
  formattedTime: string;
  formattedAxisTime: string;
  value: number[];
  formattedValue: string[];
}

export interface TrendsAPIResponse {
  default: {
    timelineData: TimelineData[];
  };
}

export interface TrendsData {
  interest: TimelineData[];
}

export interface GoogleTrendsProps {
  packageName: string;
}

export type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: Array<{
    value: number;
    name?: string;
    dataKey?: string;
    payload: TimelineData;
  }>;
};