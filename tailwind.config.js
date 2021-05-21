const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['**/*.tsx'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        sidebar: '#141414'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
