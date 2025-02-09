export function Keywordkeleton() {
  return (
    <div className="bg-secondary-90 w-[224px] h-[240px] animate-pulse rounded-[23.03px] py-9 px-4">
      <div className="w-[119px] h-[23px]  bg-secondary-60 mb-2 rounded-[23.03px]" />
      <div className="flex flex-col">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-[163px] h-[21px] mb-2 rounded-[23.03px] bg-secondary-80" />
        ))}
      </div>
    </div>
  );
}
