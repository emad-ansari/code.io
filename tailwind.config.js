/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fugaz: [ "Fugaz One", "sans-serif"],
        dmMono: ["DM Mono", "monospace"]
      }
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '.no-spin': {
          // Hide spin buttons for Chrome, Safari, Edge, Opera
          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: '0',
          },
          // Hide spin buttons for Firefox
          '-moz-appearance': 'textfield',
        },
      });
    },
  ],
}