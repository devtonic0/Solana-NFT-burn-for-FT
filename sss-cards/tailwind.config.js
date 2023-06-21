// default settings can be found here
// https://unpkg.com/browse/tailwindcss@2.2.17/stubs/defaultConfig.stub.js

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'false' or 'class'
  theme: {
    fontFamily: {
      // sans: ['Graphik', 'sans-serif'],
      // serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        orange: {
          300: '#fea500',
          400: '#e06603',
          500: '#de6607',
        },
        gray: {
          200: '#d5d5d5',
          500: '#a4a4a4'
        }
      },
      fontFamily: {
        'typewriter': ['BohemianTypewriter', ...defaultTheme.fontFamily.sans],
      },
      // spacing: {
      //   '128': '32rem',
      //   '144': '36rem',
      // },
      // borderRadius: {
      //   '4xl': '2rem',
      // }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      // first one will be the default theme
      "forest",
      // uncomment to enable
      // "light (default)",
      // "dark",
      // "cupcake",
      // "bumblebee",
      // "emerald",
      // "corporate",
      // "synthwave",
      // "retro",
      // "cyberpunk",
      // "valentine",
      // "halloween",
      // "garden",
      // "forest",
      // "aqua",
      // "lofi",
      // "pastel",
      // "fantasy",
      // "wireframe",
      // "black",
      // "luxury",
      // "dracula",
    ],
    base: false,
    utils: true,
    logs: true,
    rtl: false,
  },
};
