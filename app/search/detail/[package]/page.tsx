// app/search/detail/[package]/page.tsx
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

interface TimelineData {
  time: string;
  formattedTime: string;
  value: number[];
}

interface TrendsData {
  interest: TimelineData[];
}

interface PageProps {
  params: {
    package: string;
  };
}

export default function PackageDetailPage({ params }: PageProps) {
  const [trendsData, setTrendsData] = useState<TrendsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="bg-white p-3 shadow-lg border">
          <p className="font-medium">{label}</p>
          <p className="text-blue-600">
            Interest: {payload[0].value}
            <span className="text-sm text-gray-500 ml-1">/ 100</span>
          </p>
        </Card>
      );
    }
    return null;
  };

  useEffect(() => {
    const fetchTrendsData = async () => {
      try {
        const response = await fetch(
          `/api/google-trends?keyword=${encodeURIComponent(params.package)}`
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        if (!data.interest || !Array.isArray(data.interest)) {
          throw new Error('Invalid data format received');
        }

        setTrendsData(data);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendsData();
  }, [params.package]);

  if (loading) {
    return <div className="p-4">Loading trends data...</div>;
  }

  if (error || !trendsData || !trendsData.interest) {
    return <div className="p-4 text-red-500">{error || 'No trend data available'}</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Search Interest: {params.package}</h1>

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Understanding the Scores</h2>
        <p className="text-gray-600 mb-4">
          These numbers represent search interest relative to the peak popularity for this term over
          the past year:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>
            <span className="font-medium">100</span> is the peak popularity
          </li>
          <li>
            <span className="font-medium">50</span> means the term is half as popular
          </li>
          <li>
            <span className="font-medium">0</span> means there was not enough data
          </li>
        </ul>
      </Card>

      <Card className="p-6">
        <div className="h-[400px] w-full">
          {trendsData.interest.length > 0 ? (
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
                <Tooltip content={<CustomTooltip />} />
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
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No trend data available for this package
            </div>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
          <span>Data points: {trendsData.interest.length}</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </Card>
    </div>
  );
}
