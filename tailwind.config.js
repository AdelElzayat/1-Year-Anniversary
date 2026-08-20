/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#10080d',
          900: '#160b12',
          850: '#1a0d16',
          800: '#21101a',
          700: '#2b1a26',
          600: '#3a2233'
        },
        cream: {
          50: '#fff4f1',
          100: '#f8e9e9',
          200: '#f0dcd3',
          300: '#e8c7b8'
        },
        rose: {
          200: '#f9c7ce',
          300: '#d98fa6',
          400: '#c76b88',
          500: '#9e526b',
          600: '#6f243f',
          900: '#4a1829',
          950: '#2e0f1a'
        },
        blush: '#c76b88',
        lavender: {
          200: '#ddd2ef',
          300: '#cfc3e8',
          400: '#b3a2d8',
          500: '#9a86c9'
        },
        gold: {
          200: '#f2ddc2',
          300: '#e0c698',
          400: '#c9a66b',
          500: '#b08c55',
          600: '#96723a'
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive']
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(217, 143, 166, 0.28)',
        'glow-rose': '0 0 60px -12px rgba(155, 82, 107, 0.38)',
        card: '0 30px 70px -18px rgba(20, 8, 14, 0.92)',
        inner: 'inset 0 1px 0 rgba(255,255,255,0.06)'
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(1200px 620px at 50% -10%, rgba(155, 82, 107, 0.28), transparent 60%)'
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
