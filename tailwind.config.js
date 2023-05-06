/** @type {import('tailwindcss').Config} */
export default {
  content: ["./pages/**/*.{html,js}", "./components/**/*.{html,js}"],
  theme: {
    colors: {
      main: "#0317fc",
    },
    fontFamily: {
      calibri: "calibri",
    },
    extend: {
      spacing: {
        128: "32rem",
      },
    },
  },
  plugins: [],
};
