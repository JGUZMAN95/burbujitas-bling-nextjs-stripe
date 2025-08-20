/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
        green: "#a6ba5c",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px", // your default body text
        md: "20px", // subheadings
        lg: "28px", // section headers
        xl: "36px", // hero text
        "2xl": "48px", // big hero / landing
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Averia Serif Libre", "serif"],
        accent: ["MyFont", "sans-serif"],
        caption: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [require("tailwind-hamburgers")],
};
