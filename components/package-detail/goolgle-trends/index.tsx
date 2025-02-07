// components/package-detail/google-trends/index.tsx
'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  Label,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';
import { GoogletrendsAtom } from '@/store/atoms';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { GoogleTrendsProps, TrendsData } from '@/types/google-trends';
import { fetchGoogleTrends } from '@/app/api/google-trends/actions';
import { GoogleTrendsSkeleton } from '@/components/skeletons/GoogleTrendsSkeleton';

export function GoogleTrends({ packageName }: GoogleTrendsProps) {
  // React Query를 사용한 데이터 fetch
  const setGoogleTrends = useSetRecoilState(GoogletrendsAtom);
  const currentValue = useRecoilValue(GoogletrendsAtom);
  const queryClient = useQueryClient();
  const {
    data: trendsData, // API 응답 데이터
    error, // 에러 객체
    isLoading, // 초기 로딩 상태
    refetch,
  } = useQuery({
    queryKey: ['googleTrends', packageName], // 캐시 키
    queryFn: () => fetchGoogleTrends(packageName), // API 호출 함수
    select: (data) => {
      // 데이터가 있고 54번째 항목이 있을 때만 실행
      if (data?.interest?.[53]?.value) {
        setGoogleTrends(data.interest[53].value[0]);
      } else {
        setGoogleTrends(null);
      }
      return data;
    },
  });

  console.log('setset', currentValue);

  // Query 상태 로깅
  const queryState = queryClient.getQueryState(['googleTrends', packageName]);
  const cacheData = queryClient.getQueryData(['googleTrends', packageName]);

  console.log('trendsData:', trendsData);
  console.log('Query Info:', {
    status: queryState?.status,
    isCached: !!cacheData,
    lastUpdated: queryState?.dataUpdatedAt,
  });
  useEffect(() => {
    console.log('컴포넌트 마운트trend:', packageName);
  }, []);
  const calculateAverage = useMemo(() => {
    if (!trendsData?.interest) return 0;
    const sum = trendsData.interest.reduce((acc, curr) => acc + curr.value[0], 0);
    return sum / trendsData.interest.length;
  }, [trendsData]);

  /*
  const maxValue = useMemo(() => {
    if (!trendsData?.interest) return 0;
    return Math.max(...trendsData.interest.map((item) => item.value[0]));
  }, [trendsData]);
*/
  if (isLoading) {
    return <GoogleTrendsSkeleton />;
  }

  if (error || !trendsData?.interest?.length) {
    return (
      <div className="p-4 text-red-500">
        {error instanceof Error ? error.message : '데이터를 찾을 수 없습니다'}
        <button
          onClick={() => refetch()}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          재시도
        </button>
      </div>
    );
  }

  return (
    <div className="w-[785px] h-full">
      <div className="w-full bg-secondary-90 rounded-[20px] p-6 mb-6">
        <p className="text-xl font-semibold mb-2 text-primary-50">
          Understanding Google Trends Scores
        </p>
        <p className="text-[#F6F6F6] mb-4">
          Numbers represent relative search interest where 100 is the peak popularity for the term.
          A value of 50 means it is half as popular, and 0 means insufficient data.
        </p>
      </div>
      {/* 상단 설명 부분은 동일 */}
      <div className="h-auto bg-secondary-90 rounded-[20px] p-5 w-full">
        <p className="text-xl font-semibold mb-2 text-primary-50">Weeckly download graph</p>
        <p className="text-[#F6F6F6] mb-4">
          A calendar module that is based on material design concepts.
        </p>

        <div className="h-[352px] w-[661px] ml-14 mt-3 rounded-[20px] bg-white">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendsData.interest}
              margin={{ top: 10, right: 30, left: 10, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="formattedTime"
                angle={-45}
                textAnchor="end"
                height={70}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                label={{
                  value: 'Search Interest',
                  angle: -90,
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' },
                }}
              />

              <Tooltip
                content={(props) => <CustomTooltip {...props} average={calculateAverage} />}
              />
              <Legend />

              <ReferenceLine
                y={calculateAverage}
                stroke="#000000"
                strokeDasharray="3 3"
                label={{
                  value: 'Average',
                  position: 'left',
                  fill: '#000000',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              />

              <Line
                className="pt-2"
                type="monotone"
                dataKey={(d) => d.value[0]}
                name="Interest"
                stroke="#48494D"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="text-sm pb-4 text-gray-500 flex justify-between items-center">
            <span>Data points: {trendsData.interest.length}</span>
            <span>{`${trendsData.interest[0].formattedAxisTime} - ${
              trendsData.interest[trendsData.interest.length - 1].formattedAxisTime
            }`}</span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
