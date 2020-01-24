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
        'dark-pink': '#E3506E',
        blue: '#007ace',
        red: '#de3618',
      },
    },
    gradients: theme => ({
      primary: [theme('blue'), theme('red')],
    }),
  },
  variants: {
    gradients: ['responsive', 'hover'],
  },
  plugins: [require('./plugins/gradients')],
};
