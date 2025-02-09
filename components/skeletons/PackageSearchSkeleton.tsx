export function PackageSearchSkeleton() {
  return (
    <div className="w-auto h-auto flex flex-col animate-pulse">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="w-[783px] h-[158px] mb-[12px] rounded-[23.03px] bg-secondary-90 flex py-3 pl-[20.9px] pr-[20px]"
        >
          <div className="flex flex-col w-[386px] ml-[27.49px] h-[134px]">
            <div className="w-[282px] h-[32px] bg-secondary-80 rounded-[23.03px]" />
            <div className="w-[236px] h-[28px] bg-secondary-80 rounded-[23.03px] mt-2" />
            <div className=" flex w-auto mt-2 gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-[67px] h-[22px]  rounded-[34px] bg-[#48494D]" />
              ))}
            </div>
            <div className="w-[386px] h-[24px] bg-secondary-80 rounded-[23.03px] mt-2" />
          </div>
          <div className="flex flex-col ml-[203px] ">
            <div className="w-[100px] h-[14px] mt-8 rounded-[23.03px] bg-secondary-80" />
            <div className="mt-6 bg-secondary-80 w-[32px] h-[14px] ml-[68px] rounded-[23.03px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
