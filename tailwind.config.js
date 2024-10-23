/** @type {import('tailwindcss').Config} */
import typographyPlugin from "@tailwindcss/typography";
export default {
  darkMode: "class",
  plugins: [typographyPlugin],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Montserrat, Switzer, system-ui, sans-serif",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
};
