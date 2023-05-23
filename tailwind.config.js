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
        secondary: '#526D82',
        tertiary: '#9DB2BF',
        genBg: '#DDE6ED',
      },
      width: {
        contWithXl: '1240px',
      },
    },
  },
  plugins: [],
};
