module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        baseLightest: '#CEE5F2',
        baseLighter: '#ACCBE1',
        baseLight: '#7C98B3',
        baseDark: '#637081',
        baseDarker: '#536B78',
      },
      fontFamily: {
        serif: ['IBM Plex Serif', 'serif'],
        sans: ['Inter', 'sans-serif'],
        hind: ['Hind', 'sans-serif'], // Add Hind font
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
