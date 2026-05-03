/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Used as: text-primary, bg-primary, hover:bg-primary, etc.
        primary: {
          DEFAULT:  '#0056B3',
          dark:     '#004494',
          light:    '#3378C2',
        },
        // Flat aliases so `text-primary-dark` works in templates
        'primary-dark':  '#004494',
        'primary-light': '#3378C2',
        slate: {
          900: '#003e64',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Outfit', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'premium':       '0 10px 30px -10px rgba(0, 86, 179, 0.10), 0 4px 6px -4px rgba(0, 86, 179, 0.05)',
        'premium-hover': '0 20px 50px -12px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      }
    },
  },
  plugins: [],
}
