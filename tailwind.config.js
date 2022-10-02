/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hardgreen: "#367E18",
        background: "#FFE9A0",
        primary: "#F57328",
        secondary: "#12B1C8",
        blue: "#12B1C8",
      },
    },
  },
  plugins: [],
};
