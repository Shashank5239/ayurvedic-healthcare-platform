/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        earth: {
          50: '#f0f9f0',
          500: '#10b981',
          600: '#059669',
          700: '#047857'
        },
        sand: {
          500: '#d97706',
          700: '#b45309'
        }
      }
    }
  },
  plugins: [],
}
