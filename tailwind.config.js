/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#202020',
        text: '#f2f2f2',
        accent: '#7669e9',
      },
      fontFamily: {
        'text': ['"DejaVu Sans"', 'sans-serif'],
        'detail': ['"Fira Code"', 'monospace'],
        'subtitle': ['"Chesna Grotesk"', 'Inter', 'sans-serif'],
        'title': ['"Chesna Grotesk"', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'text-base': ['16px', { lineHeight: '1.5', fontWeight: '300' }],
        'text-lg': ['18px', { lineHeight: '1.5', fontWeight: '300' }],
        'text-xl': ['20px', { lineHeight: '1.5', fontWeight: '300' }],
        'detail-sm': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'detail-md': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'detail-lg': ['32px', { lineHeight: '1.4', fontWeight: '600' }],
        'detail-xl': ['40px', { lineHeight: '1.4', fontWeight: '600' }],
        'subtitle-sm': ['20px', { lineHeight: '1.4', fontWeight: '400' }],
        'subtitle-md': ['24px', { lineHeight: '1.4', fontWeight: '400' }],
        'subtitle-lg': ['32px', { lineHeight: '1.4', fontWeight: '400' }],
        'subtitle-xl': ['40px', { lineHeight: '1.4', fontWeight: '400' }],
        'title-sm': ['60px', { lineHeight: '1.2', fontWeight: '600' }],
        'title-md': ['70px', { lineHeight: '1.2', fontWeight: '600' }],
        'title-lg': ['80px', { lineHeight: '1.2', fontWeight: '600' }],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
