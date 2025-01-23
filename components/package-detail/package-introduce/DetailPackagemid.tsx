// components/search-results/SearchResultList.tsx
// 이 파일 필요 없음
'use client';
import { useRecoilValue } from 'recoil';
import { detailPackageAtom } from '@/store/atoms';
import { DetailPackage } from './DetailPackagefinal';

export function DetailPackagemid() {
  const results = useRecoilValue(detailPackageAtom);
  return (
    <>
      {results.map((result, index) => (
        <DetailPackage key={index} result={result} />
      ))}
    </>
  );
}
