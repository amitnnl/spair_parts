/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0056B3',
        'primary-dark': '#004494',
        'primary-light': '#3385ff',
        slate: {
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 86, 179, 0.1), 0 4px 6px -4px rgba(0, 86, 179, 0.05)',
        'premium-hover': '0 20px 40px -12px rgba(0, 86, 179, 0.15)',
      }
    },
  },
  plugins: [],
}
