// ./tailwind.config.js

module.exports = {

  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,

  theme: {
      fontFamily: 'Proxima Nova',
      container: {
          center: true,
      },
    extend: {
        colors: {
            'green': '#1DB954',
            'dark': '#121212',
            'lighthover': '#282828',
            'light': '#181818',
            'lightest': '#B3B3B3',
            'darkest': '#191414',
            'grey': '#535353'
        }
    },

  },

  variants: {

    extend: {
      colors: ['active'],
    },

  },

  plugins: [],

}