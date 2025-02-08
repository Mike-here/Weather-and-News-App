/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'weather-primary': '#00668A',
        'weather-secondary': '#004E71',
      },
    },
  },
  plugins: [],
} 