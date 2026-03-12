import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1a1916',
        vellum: '#f4f1ea',
        stone: '#c8c4b8',
        dust: '#e8e4dc',
        pale: '#f9f7f3',
        warm: '#faf8f4',
        accent: '#c8a882',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-suisse)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.28em',
        wider: '0.18em',
        wide: '0.12em',
      },
    },
  },
  plugins: [],
}

export default config
