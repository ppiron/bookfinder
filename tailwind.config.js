const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
// console.log(colors);

module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,svelte}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      "blue-gray": colors.blueGray,
      "warm-gray": colors.warmGray,
      "cool-gray": colors.coolGray,
      "true-gray": colors.trueGray,
      sky: colors.lightBlue,
    },
    screens: {
      xs: "425px",
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: (theme) => ({
        "no-image": "url('/no-image-96.png')",
      }),
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
