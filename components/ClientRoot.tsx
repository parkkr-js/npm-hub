'use client';

import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

let apiCallCount = 0;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 데이터 신선도 유지
      gcTime: 5 * 60 * 1000, // 캐시 유지 시간
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

/*
RecoilRoot와 QueryClientProvider는 React Context를 제공하는 Provider 컴포넌트입니다. 일반적으로 Context Provider들은 중첩해서 사용할 수 있으며, 하위 컴포넌트들이 각각의 Context에 접근할 수 있도록 합니다.
코드에서 return 문이 한 줄로 되어 있어서 문제가 발생했습니다. JSX에서는 여러 Provider를 중첩할 때 괄호와 적절한 들여쓰기를 사용하여 가독성을 높이고 오류를 방지해야 합니다.
 */
