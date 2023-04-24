/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
      },
      textColor: {
        default: "#FFF",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "62.5%", fontWeight: "700" },
        body: { fontSize: "1.6rem" },
      });
    }),
  ],
};
