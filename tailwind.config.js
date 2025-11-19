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
        'rolex-gold': '#a37e2c',
      },
    },
  },
  plugins: [],
}