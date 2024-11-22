import { DashboardCardData } from '@/types';

type Props = {
  data: DashboardCardData;
};

export default function DashboardCard({ data }: Props) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{data.title}</h2>
      <p className="text-gray-600 mt-2">{data.content}</p>
    </div>
  );
}
