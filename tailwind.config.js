/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#07070f',
          900: '#0b0b17',
          850: '#10101f',
          800: '#14142a',
          700: '#1d1d38',
          600: '#2a2a4d'
        },
        cream: {
          50: '#fdfaf3',
          100: '#f8f0e0',
          200: '#efe2c9',
          300: '#e3d0ac'
        },
        rose: {
          200: '#f4d6da',
          300: '#eec3c8',
          400: '#e0a7ae',
          500: '#cd8089',
          600: '#b25f69'
        },
        blush: '#c9a0a6',
        lavender: {
          200: '#ddd2ef',
          300: '#cfc3e8',
          400: '#b3a2d8',
          500: '#9a86c9'
        },
        gold: {
          200: '#f2e3bd',
          300: '#ecd9a6',
          400: '#dcc083',
          500: '#c9a35c',
          600: '#a97f3d'
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive']
      },
      boxShadow: {
        glow: '0 0 60px -8px rgba(220, 192, 131, 0.35)',
        'glow-rose': '0 0 60px -8px rgba(224, 167, 174, 0.4)',
        card: '0 30px 70px -18px rgba(0, 0, 0, 0.85)',
        inner: 'inset 0 1px 0 rgba(255,255,255,0.08)'
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(1200px 600px at 50% -10%, rgba(124, 47, 52, 0.28), transparent 60%)'
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3.2s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite'
      }
    }
  },
  plugins: []
}
