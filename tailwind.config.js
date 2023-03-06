/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            100: '#65E9E4',
            200: '#31C3BD',
            300: '#1F3641',
            400: '#1A2A33',
          },
          yellow: {
            100: "#FFC860",
            200: "#F2B137"
          },
          white: {
            100: "#DBE8ED",
            200: "#A8BFC9"
          }
        }
      }
    },
  },
  plugins: [],
}
