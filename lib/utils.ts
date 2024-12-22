// lib/utils.ts

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MD5 } from 'crypto-js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPublisherAvatarUrl(
  email: string,
  size = 50,
  rating = 'g',
  fallback = 'retro'
): string {
  const emailHash = MD5(email?.trim()?.toLowerCase() || ' ');
  return `https://www.gravatar.com/avatar/${emailHash}?d=${fallback}&r=${rating}&s=${size}`;
}

export function calculateBadges<
  T extends {
    package: {
      name: string;
      downloadCount: number;
      date: string;
    };
    score: {
      detail: {
        popularity: number;
      };
    };
  },
>(
  packages: T[],
  originalOrder?: string[]
): (T & {
  badges: {
    isExactMatch: boolean;
    isMostDownloaded: boolean;
    isMostRecent: boolean;
    isMostPopular: boolean;
  };
})[] {
  if (!packages.length) return [];

  const mostDownloaded = packages.reduce(
    (max, curr) => (curr.package.downloadCount > max.package.downloadCount ? curr : max),
    packages[0]
  );

  const mostRecent = packages.reduce(
    (max, curr) => (new Date(curr.package.date) > new Date(max.package.date) ? curr : max),
    packages[0]
  );

  const mostPopular = packages.reduce(
    (max, curr) => (curr.score.detail.popularity > max.score.detail.popularity ? curr : max),
    packages[0]
  );

  const exactMatchName = originalOrder?.[0];

  return packages.map((pkg) => ({
    ...pkg,
    badges: {
      isExactMatch: exactMatchName ? pkg.package.name === exactMatchName : false,
      isMostDownloaded: pkg === mostDownloaded,
      isMostRecent: pkg === mostRecent,
      isMostPopular: pkg === mostPopular,
    },
  }));
}

export function getTimeAgo(date: string) {
  const now = new Date();
  const past = new Date(date);
  const diffInMs = now.getTime() - past.getTime();

  const minutes = Math.floor(diffInMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
  if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
}
