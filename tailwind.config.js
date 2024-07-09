/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        dark: "hsl(0,0%,100%)",
        light: "hsl(200,15%,8%)",
        lighter: "hsl(0,0%,52%)",
        darker: "hsl(0,0%,75%)",
      },
      backgroundColor: {
        "element-dark": "hsl(209,23%,22%)",
        "element-light": "hsl(0,0%,100%)",
        "input-light": "hsl(0,0%,52%)",
        "paper-dark": "hsl(207,26%,17%)",
        "paper-light": "hsl(0,0%,98%)",
      },
      screens: {
        xs: "(min-width:600px)",
      },
    },
  },
  plugins: [],
};
