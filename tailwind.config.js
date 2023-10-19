/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins"],
    },
    colors: {
      green: "#12B15C",
      white: "#FFFFFF",
      darkgreen: "#0D964D",
      gray: "#F3F6F0",
      blue: "#7EB2FF",
      yellow: "#FFDC84",
      red: "#FF7E7E",
      black: "#000000",
      border: "#E8E8E8",
    },
  },
  plugins: [],
};
