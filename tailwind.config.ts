import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { pashto: ['var(--font-pashto)', 'Tahoma', 'Arial', 'sans-serif'] },
      colors: {
        emeraldDeep: '#064E3B',
        royalBlue: '#1D4ED8',
        goldAccent: '#F5C542'
      },
      boxShadow: { premium: '0 24px 80px rgba(2, 44, 34, 0.22)' }
    }
  },
  plugins: []
};
export default config;
