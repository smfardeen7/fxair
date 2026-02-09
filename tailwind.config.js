/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        fxair: {
          'purple-dark': '#2d1b4e',
          'purple-darker': '#1f1335',
          purple: '#6d28d9',
          'purple-light': '#8b5cf6',
          'purple-bright': '#a78bfa',
          gray: '#374151',
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
