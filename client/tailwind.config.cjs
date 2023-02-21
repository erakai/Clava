/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : '#ffb500',
        'secondary' : '#ffd366',
      },
    },
  },
  plugins: [],
}
