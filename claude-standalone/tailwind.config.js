/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: '#005CE8',
        gray: '#191B1C',
        'brand-green': '#017737',
        success: '#0FAF62',
        danger: '#E84646',
        'blue-primary': '#1361f5',
      },
    },
  },
  plugins: [],
}
