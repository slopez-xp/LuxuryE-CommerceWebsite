/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,html}",
    "./components/**/*.{js,ts,jsx,tsx,mdx,html}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,html}",
    "./*.{html,js}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Luxury Gold Palette
        'rolex-gold': {
          DEFAULT: '#a37e2c',
          light: '#c5a85f',
          dark: '#8a6a24',
          glow: 'rgba(163, 126, 44, 0.3)',
        },
        // ROLEX GREEN CONSTANT
        'rolex-green': {
          DEFAULT: '#006039',
          light: '#008050',
          dark: '#004028',
          glow: 'rgba(0, 96, 57, 0.3)',
        },
        // Neutral Palette
        'luxury': {
          black: {
            pure: '#000000',
            soft: '#0a0a0a',
            elevated: '#1a1a1a',
          },
          gray: {
            dark: '#2a2a2a',
            medium: '#666666',
            light: '#999999',
          },
          white: {
            pure: '#ffffff',
            soft: '#f5f5f5',
            muted: '#cccccc',
          },
        },
        // Semantic Colors
        'semantic': {
          success: '#4a9b50',
          error: '#c94a4a',
          warning: '#d4af37',
          info: '#5a8fa8',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['-apple-system', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Courier New', 'monospace'],
      },
      letterSpacing: {
        tight: '-0.02em',
        wider: '0.15em',
        widest: '0.3em',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(163, 126, 44, 0.3)',
        'gold-lg': '0 0 40px rgba(163, 126, 44, 0.4)',
        'green': '0 0 20px rgba(0, 96, 57, 0.3)',
        'green-lg': '0 0 40px rgba(0, 96, 57, 0.4)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}