import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
// 표시할 패키지 데이터 배열
import checkicon from '@/public/images/check.png';
const packages = [
  {
    title: 'custom_lint',
    description:
      'Lint rules are a powerful way to improve the maintainability of a project. Custom Lint allows',
    source: 'invertase.io',
  },
  {
    title: 'flutter_bloc',
    description:
      'State management solution for Flutter applications. Built with simplicity in mind.',
    source: 'pub.dev',
  },
  {
    title: 'provider',
    description:
      'A wrapper around InheritedWidget to make them easier to use and more reusable.',
    source: 'pub.dev',
  },
  {
    title: 'get_it',
    description:
      'Simple direct Service Locator that allows to decouple the interface from a concrete implementation.',
    source: 'pub.dev',
  },
  {
    title: 'dio',
    description:
      'A powerful HTTP client for Dart/Flutter, which supports global configuration, interceptors, and more.',
    source: 'pub.dev',
  },
  {
    title: 'freezed',
    description:
      'Code generation for immutable classes with simple syntax for both defining and using them.',
    source: 'pub.dev',
  },
];

export function CarouselDemo() {
  return (
    <Carousel
      // 캐러셀의 전체 너비 설정
      className="w-full max-w-6xl"
      // 캐러셀의 옵션 설정
      opts={{
        align: 'start', // 첫 번째 아이템부터 정렬 시작

        //여기 부터는 화살표 없앨거면 필요하다
        loop: false, // 순환하지 않도록 설정 (처음과 끝이 있음)
        dragFree: false, // 자유 드래그 대신 스냅 효과 사용
        skipSnaps: false, // 부드러운 스냅 효과
        active: true, // 마우스 오버시 활성화
      }}
    >
      {/* 캐러셀의 실제 컨텐츠를 감싸는 컨테이너 */}
      <CarouselContent>
        {/* packages 배열을 순회하며 각 아이템을 렌더링 */}
        {packages.map((pkg, index) => (
          <CarouselItem
            key={index}
            // 반응형 크기 설정
            // md: 중간 화면에서 2개씩 표시
            // lg: 큰 화면에서 4개씩 표시
            className="md:basis-1/2 lg:basis-1/4"
          >
            <div className="p-1 w-full">
              {/* 각 패키지 정보를 담은 카드 */}

              <Card
                className="bg-secondary-90 border-secondary-90 w-[280.545px] h-[205.174px]
              gap-[10.468px]"
              >
                <div className="flex w-[248.094px] flex-col">
                  {/* 카드 내용 */}
                  <CardContent className="px-[20.936px] py-[23.03px] flex flex-col items-start">
                    {/* 패키지 제목 */}
                    <h3
                      className="text-primary-60
                  font-pretendard
                  text-2xl
                  leading-[normal] 
                  font-semibold
                 "
                    >
                      {pkg.title}
                    </h3>
                    {/* 패키지 설명 */}
                    <p
                      className="text-secondary-10
                      w-auto
                  font-pretendard
                  text-[16px]
                  leading-6
                  font-normal
                  h-[72px]
                    line-clamp-3    // 3줄까지만 표시하고 넘으면 ...
    overflow-hidden // 넘치는 텍스트 숨기기
    my-[12.56px]
                             
                  "
                    >
                      {pkg.description}
                    </p>
                    {/* 패키지 출처 */}
                    <div className=" flex items-center gap-1">
                      <Image
                        src={checkicon} // 돋보기 이미지 경로
                        alt="Search"
                        width={12.562}
                        height={12.562}
                        className="pointer-events-none" // 이미지의 기본 이벤트 제거
                      />
                      <div
                        className="
                   text-secondary-50
                  font-pretendard
                  text-[16px]
                  font-normal
                  leading-normal
                   "
                      >
                        {pkg.source}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-white font-" />
      <CarouselNext className="text-white" />
    </Carousel>
  );
}
