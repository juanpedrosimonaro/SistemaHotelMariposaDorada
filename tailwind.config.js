/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./frontend/**/*.{html,js,jsx}","./index.html"],
  theme: {
    extend: {
      colors: {
        cl1:"#B58648",
        cl2:"##6495ED",
      },
      fontFamily: {
        playfair: ['Playfair Display','serif'],
        lato: ['Lato','sans-serif']
      },
    }

  },
  plugins: [require('@savvywombat/tailwindcss-grid-areas')],
}
