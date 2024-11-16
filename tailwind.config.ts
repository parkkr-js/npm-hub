import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    /* 
    // 이렇게 바로 theme 아래에서 바꾸면 기본값을 모두 덮어씁니다.
		colors: {
			primary: '#2a7de1',
			...
		},
    
    */
    extend: {
      // extend 아래에서 설정하면 Tailwind의 클래스를 유지하면서 내가 설정한 값만 변경합니다.

      colors: {
        background: 'hsl(var(--secondary-100))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          100: 'hsl(var(--primary-100))',
          90: 'hsl(var(--primary-90))',
          80: 'hsl(var(--primary-80))',
          70: 'hsl(var(--primary-70))',
          60: 'hsl(var(--primary-60))',
          50: 'hsl(var(--primary-50))',
          40: 'hsl(var(--primary-40))',
          30: 'hsl(var(--primary-30))',
          20: 'hsl(var(--primary-20))',
          10: 'hsl(var(--primary-10))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          100: 'hsl(var(--secondary-100))',
          90: 'hsl(var(--secondary-90))',
          80: 'hsl(var(--secondary-80))',
          70: 'hsl(var(--secondary-70))',
          60: 'hsl(var(--secondary-60))',
          50: 'hsl(var(--secondary-50))',
          40: 'hsl(var(--secondary-40))',
          30: 'hsl(var(--secondary-30))',
          20: 'hsl(var(--secondary-20))',
          10: 'hsl(var(--secondary-10))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      spacing: {
        xs: 'var(--size-xs)',
        sm: 'var(--size-sm)',
        base: 'var(--size-base)',
        lg: 'var(--size-lg)',
        xl: 'var(--size-xl)',
        '2xl': 'var(--size-2xl)',
        '3xl': 'var(--size-3xl)',
      },
      padding: {
        1: 'var(--spacing-1)',
        2: 'var(--spacing-2)',
        3: 'var(--spacing-3)',
        4: 'var(--spacing-4)',
        6: 'var(--spacing-6)',
        8: 'var(--spacing-8)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        'made-tommy': ['MADE TOMMY', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // require('@tailwindcss/container-queries'), // line-clamp는 이제 기본으로 포함됨
  ],
};
export default config;
