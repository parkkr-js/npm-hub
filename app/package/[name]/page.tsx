import MarkdownSection from '@/components/client/MarkDownSection';

interface PackageDetailsProps {
  params: {
    name: string;
  };
}

export default function PackageDetails({ params }: PackageDetailsProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{params.name}</h1>
      <MarkdownSection packageName={params.name} />
    </div>
  );
}
