/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f5deb3",
        details: "#4d6648ff",
        highlight: "#84592B",
        highlight2: "#442D1C",
        highlight3: "#2e170eff",
      },
      fontFamily: {
         romantic: ['"Mea Culpa"', 'cursive'],
          texts: ['"League Script"', 'cursive'],
          sans: ['"Julius Sans One"', 'sans-serif'],
      },
    
    },
  },
  plugins: [],
};
