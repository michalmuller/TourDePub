module.exports = {
  important: true,
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    fontFamily: {
      display: ['Raleway', 'sans-serif'],
      body: ['Raleway', 'sans-serif'],
    },
    extend: {
      colors: {
        blue: '#538BED',
        purple: '#875BE9',
      },
    },
    gradients: theme => ({
      primary: [theme('colors.blue'), theme('colors.purple')],
    }),
  },
  variants: {
    gradients: ['responsive', 'hover'],
  },
  plugins: [require('./plugins/gradient.js')],
};
