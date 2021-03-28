const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        priest: colors.white,
        shaman: { DEFAULT: "#0070DE" },
        paladin: { DEFAULT: "#F58CBA" },
        mage: { DEFAULT: "#69CCF0" },
        rogue: { DEFAULT: "#FFF569" },
        warrior: { DEFAULT: "#C79C6E" },
        warlock: { DEFAULT: "#9482C9" },
        hunter: { DEFAULT: "#ABD473" },
        druid: { DEFAULT: "#FF7D0A" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
