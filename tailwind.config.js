/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        babyPink: '#FADADD',
        lavender: '#D3BCEB',
        mintGreen: '#B8E8DD',
        butterYellow: '#FFF0B3',
        sparkleWhite: '#FFFFFF',
        deepPlum: '#5A215A',
        fuchsia: '#DB3EB1',
      },
    },
  },
  plugins: [],
};
