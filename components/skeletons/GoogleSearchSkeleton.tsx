export function GoogleSearchResultSkeleton() {
  return (
    <div className="w-[325px] h-[569px] flex flex-col bg-secondary-90 rounded-[20px]">
      <div className="animate-pulse">
        <div className="w-[138px] mt-6 ml-8 h-[32px] bg-secondary-80 rounded-[20px]"></div>
        <div className="w-[241px] ml-8 mt-2 h-[19px] bg-secondary-80 rounded-[20px]"></div>
        <div className="w-auto mt-3 h-auto flex flex-col">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-[253px] h-[83px] mt-3 ml-6 rounded-[10px] bg-secondary-80"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
