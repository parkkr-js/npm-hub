// components/ui/Badge.tsx
'use client';

interface BadgeProps {
  variant: 'exactMatch' | 'downloads' | 'recent' | 'popular';
  children: React.ReactNode;
}

const BADGE_STYLES = {
  exactMatch: 'border-badge-badge4 text-badge-badge4',
  downloads: 'border-badge-badge1 text-badge-badge1',
  recent: 'border-badge-badge2 text-badge-badge2',
  popular: 'border-badge-badge3 text-badge-badge3',
} as const;

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`ml-2 w-auto pt-1 h-6 px-2 text-xs rounded-2xl border ${BADGE_STYLES[variant]}`}
    >
      {children}
    </span>
  );
}
