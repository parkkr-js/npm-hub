import { AutocompletePackageInfo } from '@/types/package';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
export default function Autocomplete({ packages }: { packages: AutocompletePackageInfo[] }) {
  if (!packages.length) return null;

  const { mostDownloaded, mostRecent, mostPopular } = packages.reduce(
    (acc, pkg) => ({
      mostDownloaded:
        pkg.package.downloadCount > acc.mostDownloaded.package.downloadCount
          ? pkg
          : acc.mostDownloaded,
      mostRecent:
        new Date(pkg.package.date) > new Date(acc.mostRecent.package.date) ? pkg : acc.mostRecent,
      mostPopular:
        pkg.score.detail.popularity > acc.mostPopular.score.detail.popularity
          ? pkg
          : acc.mostPopular,
    }),
    { mostDownloaded: packages[0], mostRecent: packages[0], mostPopular: packages[0] }
  );
  const Badge = ({
    children,
    color,
  }: {
    children: React.ReactNode;
    color: 'green' | 'pink' | 'blue' | 'purple';
  }) => {
    const colorClasses = {
      green: 'border-alert-green text-alert-green',
      pink: 'border-alert-pink text-alert-pink',
      blue: 'border-alert-blue text-alert-blue',
      purple: 'border-alert-purple text-alert-purple',
    };

    return (
      <span className={`text-xs px-2 py-0.5 rounded-full border ${colorClasses[color]}`}>
        {children}
      </span>
    );
  };
  return (
    <div className="w-auto border-2 bg-surface-high border border-surface-medium rounded-3xl shadow-lg mt-1 overflow-hidden z-50">
      <div className="max-h-[480px] overflow-y-auto">
        {packages.map((pkg, index) => (
          <div
            key={pkg.package.name}
            className="border-b-2 border-surface-medium last:border-none hover:bg-surface-hover cursor-pointer"
          >
            <div className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-primary-50 font-medium">{pkg.package.name}</span>
                    {index === 0 && <Badge color="green">exact match</Badge>}
                    {pkg === mostDownloaded && <Badge color="pink">most downloads</Badge>}
                    {pkg === mostRecent && <Badge color="blue">most recent</Badge>}
                    {pkg === mostPopular && <Badge color="purple">most popular</Badge>}
                  </div>
                  <p className="text-surface-white text-sm">{pkg.package.description}</p>
                </div>
                <div className="flex flex-col items-end whitespace-nowrap">
                  <span className="text-surface-disabled text-sm">Downloads / week</span>
                  {pkg === mostDownloaded ? (
                    <span className="text-alert-pink font-medium">
                      {pkg.package.downloadCount.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-surface-medium font-medium">
                      {pkg.package.downloadCount.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
