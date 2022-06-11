module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#13293d",
      },
      spacing: {
        15: "60px",
        18: "74px",
      },
      borderWidth: {
        0.5: "0.5px",
      },
      gridTemplateColumns: {
        14: "repeat(14, minmax(0, 1fr))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
