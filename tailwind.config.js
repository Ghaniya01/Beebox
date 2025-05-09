
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Ensure JSX/TSX are included
  theme: {
    extend: {
      colors: {
        primary: "#925FE2", // Light purple (example)
        secondary: "#545454", // Custom purple (example)
        grey: "#F3F3F3",
        textgrey: "#A1A1A1"
      },
    },
  },
  plugins: [],
};
