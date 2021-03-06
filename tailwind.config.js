const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},

    fontFamily: {
      sans: ["Proxima Nova", ...defaultTheme.fontFamily.sans],
    },
    colors: {
      black: "#141625",
      white: "#ffffff",
      d_purple: "#1e2139",
      l_purple: "#7c5dfa",
      red: "#ec5757",
      blue: "#252945",
      violet: "#dfe3fa",
      green: "#33d69f",
      orange: "#ff8f00",
    },
    screens: {
      md: "900px",
    },
  },
  plugins: [],
};
