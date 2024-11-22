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
