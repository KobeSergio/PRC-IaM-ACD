/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#3C6497",
        darkGray: "#5C5C5C",
        darkerGray: "#3D3D3D",
        lightestGray: "#EFEFF0",
      },
      fontFamily: {
        monts: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        'nav': "0px 3px 10px -4px rgba(0, 0, 0, 0.15)"
      },
    },
  },
  plugins: [],
}
