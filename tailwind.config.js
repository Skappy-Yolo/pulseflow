/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Public Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#EBF2FF',
          100: '#D6E5FF',
          200: '#ADC9FF',
          300: '#85ADFF',
          400: '#5C91FF',
          500: '#005CE8',
          600: '#0049B8',
          700: '#003687',
          800: '#002356',
          900: '#001025',
        },
        gray: {
          900: '#191B1C',
        },
        brand: {
          green: '#017737',
        },
        success: '#0FAF62',
        danger: '#E84646',
        blue: {
          primary: '#1361f5',
        }
      }
    },
  },
  plugins: [],
}
