// components/package-detail/google-trends/index.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { GoogleTrendsProps, TrendsData } from '@/types/google-trends';

import { fetchGoogleTrends } from '@/app/api/google-trends/actions';
import { GoogleTrendsSkeleton } from '@/components/skeletons/GoogleTrendsSkeleton';
import { CustomTooltip } from '@/components/package-detail/goolgle-trends/CustomTooltip';

export function GoogleTrends({ packageName }: GoogleTrendsProps) {
  const [trendsData, setTrendsData] = useState<TrendsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrendsData = async () => {
      try {
        const data = await fetchGoogleTrends(packageName);
        setTrendsData(data);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadTrendsData();
  }, [packageName]);

  if (loading) {
    return <GoogleTrendsSkeleton />;
  }

  if (error || !trendsData || !trendsData.interest) {
    return <div className="p-4 text-red-500">{error || 'No trend data available'}</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Understanding Google Trends Scores</h2>
        <p className="text-gray-600 mb-4">
          Numbers represent relative search interest where 100 is the peak popularity for the term.
          A value of 50 means it is half as popular, and 0 means insufficient data.
        </p>
      </Card>

      <Card className="p-6">
        <div className="h-[400px] w-full">
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
              <Tooltip content={CustomTooltip} />
              <Legend />
              <Line
                type="monotone"
                dataKey={(d) => d.value[0]}
                name="Interest"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
          <span>Data points: {trendsData.interest.length}</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </Card>
    </div>
  );
}
