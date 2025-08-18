/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        softYellow: "#F3D87F",
        softCoral: "#E07A5F",
        softBlue: "#9DBDD9",
        softWhite: "#FFF8F0",
        softPink: "#FADADD",
        darkBrown: "#68513dff",
        softBrown: "#bb936eff",
        charcol: "#3B3B3B",
        green:"#a6ba5c"
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        base: "28px",
        lg: "36px",
        xl: "48px",
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Averia Serif Libre', 'serif'],
        accent: ['MyFont', 'sans-serif'],
        caption: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [require('tailwind-hamburgers')],
};
