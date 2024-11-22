'use client';

import { RecoilRoot } from 'recoil';

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
