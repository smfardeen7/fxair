/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        fxair: {
          orange: '#E85D04',
          'orange-light': '#F97316',
          blue: '#1D4ED8',
          'blue-light': '#2563EB',
          yellow: '#FBBF24',
          'gray': '#374151',
          'gray-dark': '#1F2937',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
