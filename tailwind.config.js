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
        blue: '#567BDE',
        purple: '#7D56DB',
        red: '#E46B5B',
        green: '#79BF60',
        'light-blue': '#EDF2F8',
        'medium-blue': '#D8E2FF',
        'black-transparent': 'rgba(0,0,0,0.75)'
      },
      height: {
        '7': '1.75rem'
      },
      width: {
        '7': '1.75rem'
      },
      boxShadow: {
        top:
          '0 4px 6px 6px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)',
        around: '0 4px 10px 4px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)',
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
