/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      tiny: '.5rem',
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {
      colors: {
        primary: '#146C94',
        secondary: '#19A7CE',
        tertiary: '#AFD3E2',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      zIndex: {
        menu: 50,
        error: 100,
        modal: 1000,
      },
      height: {},
    },
  },
  plugins: [require('flowbite/plugin')],
}
