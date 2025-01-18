'use client';

import { useEffect, useMemo } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { detailPackageAtom } from '@/store/atoms';
import { DetailResultPackageInfo } from '@/types/package';
import { DetailPackagemid } from './DetailPackagemid';
import { DetailPackage } from './DetailPackagefinal';

interface DetailPackageWrapperProps {
  initialResults: DetailResultPackageInfo[];
}

export function DetailPackageWrapper({ initialResults }: DetailPackageWrapperProps) {
  const packageDetail = initialResults[0];

  return <DetailPackage result={packageDetail} />;
}
