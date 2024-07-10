/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#EA580C',
        'secondary': '#D1CECD',
        'tertiary': '#F5F5F5'
      }
    },
  },
  plugins: [],
}
