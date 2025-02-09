export function FilterSidekeleton() {
  return (
    <div className="w-[224px] h-[240px] flex flex-col items-center animate-pulse rounded-[23.03px] ">
      <div className="w-[123px] h-[40px]  bg-secondary-60 rounded-[23.03px]" />
      <div className="flex flex-col mt-[13px]">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-[66px] h-[21px] mb-[23px] rounded-[23.03px] bg-secondary-80" />
        ))}
      </div>
    </div>
  );
}
