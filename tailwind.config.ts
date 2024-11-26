import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';
import colors from './styles/theme/colors';

const config: Config = {
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/components/skeleton.js',
  ],
  theme: {
    extend: {
      colors,
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            // 기본 텍스트 색상
            color: colors.surface.medium,
            // 제목 스타일
            h1: {
              color: colors.surface.white,
              fontWeight: '700',
            },
            h2: {
              color: colors.surface.white,
              fontWeight: '700',
            },
            h3: {
              color: colors.surface.white,
              fontWeight: '600',
            },
            h4: {
              color: colors.surface.white,
              fontWeight: '600',
            },
            // 링크 스타일
            a: {
              color: colors.primary[40],
              '&:hover': {
                color: colors.primary[30],
              },
              textDecoration: 'none',
            },
            // 강조 텍스트
            strong: {
              color: colors.surface.white,
            },
            // 코드 블록
            code: {
              color: colors.surface.white,
              backgroundColor: colors.secondary[90],
              borderRadius: '0.25rem',
              padding: '0.25rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: 0,
              color: colors.surface.white,
            },
            pre: {
              backgroundColor: colors.secondary[90],
              border: `1px solid ${colors.secondary[80]}`,
            },
            // 인용구
            blockquote: {
              color: colors.surface.medium,
              borderLeftColor: colors.secondary[70],
            },
            // 리스트
            ul: {
              color: colors.surface.medium,
            },
            ol: {
              color: colors.surface.medium,
            },
            li: {
              '&::marker': {
                color: colors.surface.medium,
              },
            },
            // 테이블
            table: {
              thead: {
                borderBottomColor: colors.secondary[80],
              },
              th: {
                color: colors.surface.white,
                backgroundColor: colors.secondary[90],
              },
              td: {
                borderBottomColor: colors.secondary[80],
                color: colors.surface.medium,
              },
            },
          },
        },
      },
    },
  },
  plugins: [nextui(), require('@tailwindcss/typography')],
};

export default config;
