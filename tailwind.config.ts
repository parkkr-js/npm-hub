import type { Config } from 'tailwindcss';
import colors from './styles/theme/colors';

const config: Config = {
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './config/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors,
      fontFamily: {
        tommy: ['MADE TOMMY', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
