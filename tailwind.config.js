/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'avalanche-red': '#E84142',
        'avalanche-dark': '#1a1a1a',
        'manga-white': '#f8f8f8',
        'manga-black': '#0a0a0a',
      },
      fontFamily: {
        'manga': ['Orbitron', 'sans-serif'],
        'anime': ['Noto Sans JP', 'sans-serif'],
        'royal': ['Cinzel', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glitch': 'glitch 0.3s ease-in-out',
        'whirlpool': 'whirlpool 1s ease-in-out',
        'slide-in-left': 'slideInLeft 1s ease-out forwards',
        'slide-in-right': 'slideInRight 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'smoky': 'smoky 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #E84142' },
          '100%': { boxShadow: '0 0 20px #E84142, 0 0 30px #E84142' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        whirlpool: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(0.5)' },
          '100%': { transform: 'rotate(360deg) scale(0)' },
        },
        slideInLeft: {
          from: {
            opacity: '0',
            transform: 'translateX(-100px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInRight: {
          from: {
            opacity: '0',
            transform: 'translateX(100px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(50px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        smoky: {
          '0%, 100%': {
            'background-position': '0% 50%',
            filter: 'blur(0px)',
          },
          '50%': {
            'background-position': '100% 50%',
            filter: 'blur(1px)',
          },
        },
      },
    },
  },
  plugins: [],
}