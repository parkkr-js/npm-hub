// components/package-detail/google-trends/index.tsx
'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { TrendData } from './types';

interface PackageGoogleTrendsProps {
  packageName: string;
}

export function PackageGoogleTrends({ packageName }: PackageGoogleTrendsProps) {
  const [trendData, setTrendData] = useState<TrendData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendData = async () => {
      try {
        console.log('Fetching data for:', packageName); // 디버깅용

        const response = await fetch('/api/google-trends', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            keyword: packageName,
            category: 31,
            startTime: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch trend data');
        }

        const data = await response.json();
        console.log('Received data:', data); // 디버깅용
        setTrendData(data);
      } catch (err) {
        console.error('Component Error:', err); // 자세한 에러 로깅
        setError(err instanceof Error ? err.message : 'Failed to fetch trend data');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendData();
  }, [packageName]);

  if (loading) {
    return <div className="animate-pulse">Loading trends...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Tabs defaultValue="interest">
      <TabsList>
        <TabsTrigger value="interest">Interest Over Time</TabsTrigger>
        <TabsTrigger value="related">Related Topics</TabsTrigger>
        <TabsTrigger value="queries">Related Queries</TabsTrigger>
      </TabsList>

      <TabsContent value="interest">
        <Card>
          <CardHeader>
            <CardTitle>Search Interest Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={trendData?.interestOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="formattedTime" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" name={packageName} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Related Topics Tab */}
      <TabsContent value="related">
        <Card>
          <CardHeader>
            <CardTitle>Related Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendData?.relatedTopics?.map((topic: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{topic.topic.title}</span>
                  <span className="text-sm text-muted-foreground">{topic.formattedValue}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Related Queries Tab */}
      <TabsContent value="queries">{/* Similar to Related Topics tab */}</TabsContent>
    </Tabs>
  );
}
