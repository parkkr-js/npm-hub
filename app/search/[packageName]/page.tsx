'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPackageDetails, PackageDetails } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface PackageDetailPageProps {
  params: { packageName: string };
}

function PackageDetailPage({ params }: PackageDetailPageProps) {
  const { packageName } = params;
  const router = useRouter();
  const [packageData, setPackageData] = useState<PackageDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPackageDetails = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getPackageDetails(name);
      setPackageData(result);
      console.log('Package details: ', result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (packageName) {
      fetchPackageDetails(packageName);
    }
  }, [packageName]);

  if (loading) return <p>Loading package details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      {packageData && (
        <Card className="w-full max-w-3xl p-4">
          <CardHeader>
            <h1 className="text-3xl font-bold">{packageData.name}</h1>
            <p className="text-gray-500">
              Version:
              {packageData.version}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{packageData.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold">Author</h2>
                <p>{packageData.author?.name || 'N/A'}</p>
                <p>{packageData.author?.email || 'N/A'}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Repository</h2>
                <a
                  href={packageData.links.repository?.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {packageData.links.repository?.url || 'N/A'}
                </a>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-semibold">Dependencies</h2>
              {packageData.dependencies && Object.keys(packageData.dependencies).length > 0 ? (
                <ul>
                  {Object.entries(packageData.dependencies).map(
                    ([depName, version]) => (
                      <li key={depName}>
                        {depName}
                        :
                        {version}
                      </li>
                    ),
                  )}
                </ul>
              ) : (
                <p>No dependencies found.</p>
              )}
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-semibold">Scripts</h2>
              {packageData.scripts && Object.keys(packageData.scripts).length > 0 ? (
                <ul>
                  {Object.entries(packageData.scripts).map(
                    ([scriptName, command]) => (
                      <li key={scriptName}>
                        {scriptName}
                        :
                        {command}
                      </li>
                    ),
                  )}
                </ul>
              ) : (
                <p>No scripts found.</p>
              )}
            </div>
          </CardContent>
          <Button
            variant="outline"
            onClick={() => router.push(packageData.links.npm)}
          >
            View on npm
          </Button>
        </Card>
      )}
    </div>
  );
}

export default PackageDetailPage;
