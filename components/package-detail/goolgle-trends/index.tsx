// components/package-detail/google-trends/index.tsx
'use client';

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
} from 'recharts';
import { GoogleTrendsProps, TrendsData } from '@/types/google-trends';
import { fetchGoogleTrends } from '@/app/api/google-trends/actions';
import { GoogleTrendsSkeleton } from '@/components/skeletons/GoogleTrendsSkeleton';

export function GoogleTrends({ packageName }: GoogleTrendsProps) {
  const [trendsData, setTrendsData] = useState<TrendsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrendsData = async () => {
      try {
        const data = await fetchGoogleTrends(packageName);
        setTrendsData(data);
        console.log(data);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadTrendsData();
  }, [packageName]);

  const calculateAverage = useMemo(() => {
    if (!trendsData?.interest) return 0;
    const sum = trendsData.interest.reduce((acc, curr) => acc + curr.value[0], 0);
    return sum / trendsData.interest.length;
  }, [trendsData]);

  const maxValue = useMemo(() => {
    if (!trendsData?.interest) return 0;
    return Math.max(...trendsData.interest.map((item) => item.value[0]));
  }, [trendsData]);

  if (loading) {
    return <GoogleTrendsSkeleton />;
  }

  /*
  if (error || !trendsData || !trendsData.interest) {
    return <div className="p-4 text-red-500">{error || 'No trend data available'}</div>;
  }
*/
  if (error || !trendsData || !trendsData.interest || trendsData.interest.length === 0) {
    return <div className="p-4 text-red-500">{error || 'No trend data available'}</div>;
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
      <div className="h-[352px] bg-secondary-90 rounded-[20px] p-5 w-full">
        <p className="text-xl font-semibold mb-2 text-primary-50">Weeckly download graph</p>
        <p className="text-[#F6F6F6] mb-4">
          A calendar module that is based on material design concepts.
        </p>

        <div className="h-[225px] w-[661px] ml-14 mt-3 rounded-[20px] bg-white">
          <ResponsiveContainer width="100%" height={160}>
            <LineChart
              data={trendsData.interest}
              margin={{ top: 20, right: 30, left: 30, bottom: 40 }}
            >
              <ReferenceLine
                y={calculateAverage}
                stroke="#48494D"
                strokeDasharray="3 3"
                label={
                  <Label
                    value="Average"
                    position="insideTopLeft"
                    fill="white"
                    fontSize={12}
                    background={{
                      fill: 'black',
                      padding: { top: 4, bottom: 4, left: 8, right: 8 },
                      radius: 12,
                    }}
                  />
                }
              />
              <XAxis
                axisLine={{ stroke: '#48494D' }}
                tickLine={false}
                tick={false} // 기존 틱 레이블 숨기기
              />
              <YAxis hide domain={[0, 100]} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-gray-800 p-2 rounded border border-gray-700">
                        <p className="text-white text-sm">{`Interest: ${payload[0].value}`}</p>
                        <p className="text-gray-400 text-xs">{payload[0].payload.formattedTime}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                dataKey={(d) => d.value[0]}
                strokeWidth={0}
                dot={(props) => {
                  if (!props || !props.cy || !props.cx) return null;
                  const { cx, cy, payload } = props;
                  const isMax = payload.value[0] === maxValue;

                  return (
                    <g>
                      <line
                        x1={cx}
                        y1={80}
                        x2={cx}
                        y2={cy}
                        stroke={isMax ? '#FF4D4F' : '#000'}
                        strokeWidth={1}
                      />
                      <circle
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill={isMax ? '#FF4D4F' : '#000'}
                        stroke={isMax ? '#FF4D4F' : '#000'}
                        strokeWidth={1}
                      />
                    </g>
                  );
                }}
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
