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
      boxShadow: {
        top:
          '0 4px 6px 6px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)',
      },
      borderRadius: {
        large: '30px',
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
