'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaceFrownIcon } from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';
import { redirect } from 'next/navigation';
export default function NotFound() {
  const pathname = usePathname();

  if (pathname.match(/\/search|\/detail/)) {
    redirect('/');
  }

  return (
    <main className="flex h-full flex-col items-center justify-center gap-3">
      <FaceFrownIcon className="w-10 text-primary-60" />
      <p className="font-tommy text-9xl text-primary-60 font-bold tracking-[2.4px]">
        not found page
      </p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
