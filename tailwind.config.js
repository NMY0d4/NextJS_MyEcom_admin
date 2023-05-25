/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#27374D',
        secondary: '#DDE6ED',
        tertiary: '#9DB2BF',
        danger: 'darkRed',
        genBg: '#526D82',
        
      },
      width: {
        contWithXl: '1240px',
      },
    },
  },
  plugins: [],
};
