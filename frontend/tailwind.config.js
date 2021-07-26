import defaultTheme from 'tailwindcss/defaultTheme';

const fontFamily = defaultTheme.fontFamily;
fontFamily['sans'] = [
  'Nunito Sans', // <-- Roboto is a default sans font now
  'system-ui',
  // <-- you may provide more font fallbacks here
];

fontFamily['title'] = ['Quicksand'];

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily,
    extend: {
      screens: {
        '1.5xl': '1400px',
        'xl-max': { max: '1279px' },
      },
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
        'mobile': '500px'
      },
      height: {
        'menu': '437px'
      },
      borderWidth: {
        0.2: '0.2px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
