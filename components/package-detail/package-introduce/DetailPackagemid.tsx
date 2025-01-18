// components/search-results/SearchResultList.tsx

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
