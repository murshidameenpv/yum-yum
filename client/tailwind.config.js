/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green": "#495e57",
        "primaryBg": "#FCFCFC",
        "red":"#FF6868"
      },
    },
  },
  plugins: [],
}