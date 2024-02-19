/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      oswald: ["Oswald", "sans-serif"],
    },
    extend: {
      colors: {
        'custom-gray': '#464f5c',
      },
    },
  },
  
  plugins: [],
}