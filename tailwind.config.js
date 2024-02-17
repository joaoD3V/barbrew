/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'yellow-beer': '#F4C314',
        'white-bubble': '#EEEEEE',
      },
      fontFamily: {
        sans: ['Poppins_400Regular', 'sans-serif'],
        heading: ['Poppins_600SemiBold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
