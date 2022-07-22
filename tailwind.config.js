const colors = require('tailwindcss/colors')

module.exports = {
  content: ['**/*.tsx'],
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
  plugins: [require('@tailwindcss/aspect-ratio')]
}
